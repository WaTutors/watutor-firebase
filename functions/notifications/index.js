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
 * Sends notifications to specified profiles.
 *
 * Checks for required fields and asynchronous-ly dispatches notifications with custom title, body,
 * and payload data to the specified profile IDs through Firebase Messaging.
 *
 * @since 2.0.0
 *
 * @param {Object} param0       Object containing target profile IDs and notification data.
 * @param {Object} param0.pids  Profile IDs to send to.
 * @param {Object} param0.title Notification title text.
 * @param {Object} param0.body  Notification body text.
 *
 * @returns {Promise}          All notification promises via Promise.all.
 * @throws  {https.HttpsError} Any error that occurs during sending of notifications or if the
 *                             function call body is invalid.
 */
exports.triggerCustomNotifications = async ({
  pids, title, body, data,
}) => {
  const { db, messaging } = require('../_helpers/initialize_admin');

  if (!pids || !title || !body || pids.length === 0) {
    console.error(`triggerCustomNotifications invalid body: ${pids} "${title}" "${body}"`);

    return new https.HttpsError('invalid-argument', 'Invalid body for function call.');
  }

  const promiseArrayNested = pids.map(async (pid) => {
    const docSnap = await db.doc(`Profiles/${pid}`).get();
    const { notifications } = docSnap.data();

    return notifications.map(
      (token) => messaging.send({
        data,
        notification: {
          title,
          body,
        },
        token,
        apns: {
          headers: {
            'apns-push-type': 'background',
            'apns-priority': '5',
            'apns-topic': 'com.wavisits.watutors',
          },
          payload: {
            aps: {
              contentAvailable: data ? true : undefined,
            },
          },
        },
        android: {
          priority: data ? 'high' : 'normal',
        },
      }),
    );
  });

  return Promise.all(promiseArrayNested.flat());
};
