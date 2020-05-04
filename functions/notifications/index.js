const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const jwt = require('jsonwebtoken');
const { fetch: fetch2 } = require('fetch-h2');
const admin = require('firebase-admin');
const { https } = require('firebase-functions');

const secretClient = new SecretManagerServiceClient();

const db = admin.firestore();

let apnsKey = '';

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
  if (!apnsKey) {
    apnsKey = await secretClient.accessSecretVersion({
      name: 'projects/wa-tutors/secrets/apns-key/versions/latest',
    }).then(([{ payload }]) => payload.data.toString().replace(/\\n/g, '\n'));
  }

  const token = await secretClient.accessSecretVersion({
    name: 'projects/wa-tutors/secrets/apns-token/versions/latest',
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
      parent: 'projects/wa-tutors/secrets/apns-token',
      payload: {
        data: Buffer.from(newToken, 'utf8'),
      },
    });

    return newToken;
  }

  return token;
};

/**
 * Dispatches VoIP push notification for iOS.
 *
 * Generates JWT authentication token for APNs request using the private key "apnsKey" stored in
 * Google Secret Manager and its key ID. Creates headers dictionary using this auth token. Makes
 * HTTP/2 fetch request through to Apple's APNs server.
 *
 * @since 0.0.5
 *
 * @see  getToken
 * @link https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns?language=objc
 * @link https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns?language=objc
 * @link https://developer.apple.com/documentation/pushkit/responding_to_voip_notifications_from_pushkit?language=objc
 * @link https://github.com/grantila/fetch-h2#usage
 *
 * @param {string} notificationId Notification ID to send VoIP notification to.
 * @param {Object} json           Notification payload.
 *
 * @returns {string} "Success" if notification was properly dispatched.
 * @throws  {Error}  Response text if status code is not 200.
*/
const dispatchIOS = async (notificationId, json) => {
  const headers = {
    authorization: `bearer ${await getToken()}`,
    'apns-push-type': 'voip',
    'apns-topic': 'com.wavisits.watutors.voip',
    'apns-expiration': 0,
  };

  return fetch2(`https://api.sandbox.push.apple.com:443${notificationId}`, { // TODO - Remove "sandbox" for production
    method: 'POST',
    headers,
    json,
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
 * Creates headers object using OAuth 2.0 JWT token generated from Google's Application Default
 * Credentials. Creates Android background notification object using passed data and FCM token.
 * Makes fetch POST request to the wa-tutors Firebase project's messaging endpoint.
 *
 * @since 0.0.5
 *
 * @link https://firebase.google.com/docs/reference/admin/node/admin.credential#applicationdefault
 * @link https://firebase.google.com/docs/reference/admin/node/admin.credential.Credential#getaccesstoken
 * @link https://firebase.google.com/docs/cloud-messaging/migrate-v1
 *
 * @param {string} token FCM token to send background notification to.
 * @param {Object} data  Notification payload.
 *
 * @returns {string} "Success" if notification was properly dispatched.
 * @throws  {Error}  Response text if status code is not 200.
 */
const dispatchAndroid = async (token, data) => {
  const headers = {
    authorization: `Bearer ${admin.credential.applicationDefault().getAccessToken()}`,
  };

  const body = {
    message: {
      data,
      android: {
        priority: 'high',
        restricted_package_name: 'com.wavisits.watutors',
      },
      token,
    },
  };

  return fetch('https://fcm.googleapis.com/v1/projects/wa-tutors/messages:send', {
    method: 'POST',
    headers,
    body,
  })
    .then(async (response) => {
      if (response.status !== '200') {
        throw new Error(await response.text());
      } else {
        return 'Success';
      }
    });
};

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
exports.triggerIncomingCall = async ({ slotId }) => {
  if (slotId) {
    return db.doc(`Schedule/${slotId}`).get()
      .then((doc) => doc.data())
      .then(({ providerName, consumerNotifId }) => {
        const notif = {
          handle: 'Tutor Video Call',
          callerName: providerName,
        };

        if (consumerNotifId.includes('/3/device')) return dispatchIOS(consumerNotifId, notif);

        return dispatchAndroid(consumerNotifId, notif);
      })
      .catch((error) => {
        throw new https.HttpsError('unknown', error.message, error);
      });
  }

  throw new https.HttpsError('invalid-argument', 'Missing slotId.');
};
