const { v4: uuidv4 } = require('uuid');

/**
 * Initiates network scan on remote device.
 *
 * Sends high priority background push notification to Android device with specified network scan
 * configuration.
 *
 * @link https://github.com/uuidjs/uuid
 * @link https://firebase.google.com/docs/reference/admin/node/admin.messaging.Messaging-1#send
 *
 * @param {Object} req                  HTTP request object.
 * @param {Object} req.body             Request POST body.
 * @param {Object} req.body.data        Request POST body data.
 * @param {string} req.body.data.token  Push token of device to initiate scan on.
 * @param {Object} req.body.data.config Scan configuration options.
 * @param {Object} res                  HTTP response object.
 */
exports.initiateRemoteScan = async (req, res) => {
  const { messaging } = require('../_helpers/initialize_admin');

  const { token, config } = req.body.data;

  await messaging.send({
    data: {
      payload: JSON.stringify({ remoteScan: true, config }),
    },
    token,
    android: {
      priority: 'high',
    },
  })
    .then(() => {
      res.status(200).send(uuidv4()); // send unique scan ID back
    })
    .catch((error) => {
      res.status(500).send(error);
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
 * @param {Object} req                 HTTP request object.
 * @param {Object} req.body            Request POST body.
 * @param {Object} req.body.data       Request POST body data.
 * @param {array}  req.body.data.pids  Profile IDs to send to.
 * @param {string} req.body.data.title Notification title text.
 * @param {string} req.body.data.body  Notification body text.
 * @param {Object} req.body.data.data  Notification data payload for background processing.
 * @param {Object} res                 HTTP response object.
 */
exports.triggerCustomNotifications = async (req, res) => {
  const { db, messaging } = require('../_helpers/initialize_admin');

  console.log('triggerCustomNotifications dispatching', req.body.data);

  const {
    pids, title, body, data,
  } = req.body.data;

  if (!pids || pids.length === 0) {
    console.error(`triggerCustomNotifications invalid body: ${pids}`);

    res.status(500).send('Invalid function body.');
  } else {
    const dbPromises = pids.map(async (pid) => {
      const docSnap = await db.doc(`Profiles/${pid}`).get();
      const { notifications } = docSnap.data();

      return notifications.map(
        (token) => messaging.send({
          data: {
            payload: data ? JSON.stringify(data) : '',
          },
          token,
          notification: {
            title,
            body,
          },
          apns: {
            headers: {
              'apns-push-type': 'alert',
              'apns-topic': 'com.wavisits.watutors',
            },
            payload: {
              aps: {
                contentAvailable: !!data.session,
                badge: 1,
              },
            },
          },
        })
          .catch((error) => {
            if (error.code !== 'messaging/registration-token-not-registered') {
              throw error;
            }
          }),
      );
    });

    Promise.all(dbPromises)
      .then((messagingPromises) => {
        Promise.all([].concat(...messagingPromises))
          .then(() => res.status(200).send('Success'));
      })
      .catch((error) => res.status(500).send(error));
  }
};
