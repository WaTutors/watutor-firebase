const { https } = require('firebase-functions');

let apnsKey;

/**
 * Refreshes APNs JWT token.
 *
 * Checks to see if the APNs private key is loaded, and if not, accesses it from Google Secret
 * Manager. Accesses the most recent JWT token also through the Secret Manager and checks if it has
 * expired. If it has, generates a new JWT token and stores it. Returns the new or most recent
 * token.
 *
 * @since 0.0.6
 *
 * @link https://cloud.google.com/secret-manager/docs/quickstart#create_and_access_a_secret_version
 * @link https://dev.to/googlecloud/using-secrets-in-google-cloud-functions-5aem
 *
 * @returns {string} JWT token to use with APNs.
 */
const getToken = async () => {
  const jwt = require('jsonwebtoken');
  const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
  const secretClient = new SecretManagerServiceClient();

  if (!apnsKey) {
    apnsKey = await secretClient.accessSecretVersion({
      name: 'projects/watutors-1/secrets/apns-key/versions/latest',
    }).then(([{ payload }]) => payload.data.toString().replace(/\\n/g, '\n'));
  }

  const token = await secretClient.accessSecretVersion({
    name: 'projects/watutors-1/secrets/apns-token/versions/latest',
  }).then(([{ payload }]) => payload.data.toString());

  const payload = jwt.decode(token);

  if (!payload.exp || payload.exp * 1000 < Date.now()) {
    const newToken = jwt.sign({
      iss: 'BRZ56NM6F3',
    }, apnsKey, {
      algorithm: 'ES256',
      keyid: 'UAWJ8M274W',
      expiresIn: '40 mins',
    });

    await secretClient.addSecretVersion({
      parent: 'projects/watutors-1/secrets/apns-token',
      payload: {
        data: Buffer.from(newToken, 'utf8'),
      },
    });

    return newToken;
  }

  return token;
};

/**
 * Dispatches push notifications for iOS.
 *
 * Generates JWT authentication token for APNs request using the private key "apnsKey" stored in
 * Google Secret Manager and its key ID. Creates headers dictionary using this auth token and
 * whether or not the notification is for an incoming call. Makes HTTP/2 fetch request to
 * Apple's APNs server with passed notification payload and generated headers.
 *
 * @since 0.0.5
 *
 * @see  getToken
 * @link https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns?language=objc
 * @link https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns?language=objc
 * @link https://developer.apple.com/documentation/pushkit/responding_to_voip_notifications_from_pushkit?language=objc
 * @link https://github.com/grantila/fetch-h2#usage
 *
 * @param {string} notificationId Notification ID to send push notification to.
 * @param {Object} json           Notification payload.
 *
 * @returns {string} "Success" if notification was properly dispatched.
 * @throws  {Error}  Response text if status code is not 200.
*/
const dispatchIOS = async ({ isCall, consumerNotifId, notif }) => {
  const { fetch } = require('fetch-h2');

  const headers = {
    authorization: `bearer ${await getToken()}`,
    'apns-push-type': isCall ? 'voip' : 'background',
    'apns-topic': `com.wavisits.watutors${isCall ? '.voip' : ''}`,
    'apns-expiration': 0,
  };

  if (!isCall) {
    headers['content-available'] = 1;
  }

  return fetch(`https://api.push.apple.com:443${consumerNotifId}`, {
    method: 'POST',
    headers,
    json: notif,
  })
    .then(async (response) => {
      if (response.status !== 200) {
        throw new Error(await response.text());
      } else {
        return 'Success';
      }
    });
};

/**
 * Dispatches background push notification for Android.
 *
 * Sends FCM background push notification to specificed Android device token using Firebase Admin
 * Messaging with passed payload.
 *
 * @since 0.0.5
 *
 * @link https://firebase.google.com/docs/reference/admin/node/admin.messaging.Messaging
 *
 * @param {string} token FCM token to send background notification to.
 * @param {Object} data  Notification payload.
 *
 * @returns {string} "Success" if notification was properly dispatched.
 */
const dispatchAndroid = async ({ messaging, consumerNotifId, notif }) => messaging().send({
  data: notif,
  android: {
    priority: 'high',
    restrictedPackageName: 'com.wavisits.watutors',
  },
  token: consumerNotifId,
})
  .then(() => 'Success');

/**
 * Sends incoming call notification.
 *
 * Checks for required slot ID in function call body. Finds target slot from provided ID, creates
 * notification payload and dispatches iOS or Android notification depending on the notification
 * ID content.
 *
 * @since 0.0.5
 *
 * @see  dispatchIOS
 * @see  dispatchAndroid
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Database#ref
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Reference#once
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.DataSnapshot#val
 *
 * @param {Object} param0        Object containing target slot ID.
 * @param {Object} param0.slotId ID of slot to send incoming call notification for.
 *
 * @returns {string}           "Success" if notification was properly dispatched.
 * @throws  {https.HttpsError} Any error that occurs during sending of notifications or if the
 *                             function call body is invalid.
 */
exports.triggerIncomingCall = ({ slotId }) => {
  const { db, messaging } = require('../_helpers/initialize_admin');

  if (!slotId) {
    return new https.HttpsError('invalid-argument', 'Falsy slotId.');
  }

  return db.doc(`Schedule/${slotId}`).get()
    .then((doc) => doc.data())
    .then(({ property, consumerNotifId }) => {
      let callerName = '';

      const parts = property.split('_');
      if (parts.length > 1) {
        callerName = `${parts[0].slice(0, 1).toUpperCase()}${parts[0].slice(1)} Tutor`;
      } else {
        callerName = 'Tutor';
      }

      const data = {
        isCall: true,
        consumerNotifId,
        notif: {
          handle: 'WaTutors',
          callerName,
        },
      };

      if (consumerNotifId.includes('/3/device')) return dispatchIOS(data);

      return dispatchAndroid({ messaging, ...data });
    })
    .catch((error) => {
      throw new https.HttpsError('unknown', error.message, error);
    });
};

/**
 * Sends session canceled notification.
 *
 * Checks for required slot ID in function call body. Finds target slot from provided ID, creates
 * notification payload from the slot ID's subject and dispatches iOS or Android notification
 * depending on the notification ID content.
 *
 * @since 0.1.0
 *
 * @see  dispatchIOS
 * @see  dispatchAndroid
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Database#ref
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Reference#once
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.DataSnapshot#val
 *
 * @param {Object} param0        Object containing target slot ID.
 * @param {Object} param0.slotId ID of slot to send notification for.
 *
 * @returns {string}           "Success" if notification was properly dispatched.
 * @throws  {https.HttpsError} Any error that occurs during sending of notifications or if the
 *                             function call body is invalid.
 */
exports.triggerSessionCanceled = async ({ slotId }) => {
  const { db } = require('../_helpers/initialize_admin');

  if (slotId) {
    try {
      const doc = await db.doc(`Schedule/${slotId}`).get();
      const { property, consumerNotifId } = doc.data();

      let subject = '';

      const parts = property.split('_');
      if (parts.length > 1) {
        subject = `${parts[0]} `;
      }

      const data = {
        isCall: false,
        consumerNotifId,
        notif: {
          subject: subject || 'none',
        },
      };

      if (consumerNotifId.includes('/3/device')) return dispatchIOS(data);

      return dispatchAndroid(data);
    } catch (error) {
      throw new https.HttpsError('unknown', error.message, error);
    }
  }

  throw new https.HttpsError('invalid-argument', 'Missing slotId.');
};
