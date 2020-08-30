/**
 * Sends notifications to specified profiles.
 *
 * Checks for required fields and asynchronous-ly dispatches notifications with custom title, body,
 * and payload data to the specified profile IDs through Firebase Messaging.
 *
 * @since 2.0.0
 *
 * @param {Object} req            HTTP request object.
 * @param {Object} req.body       Request POST body.
 * @param {array}  req.body.pids  Profile IDs to send to.
 * @param {string} req.body.title Notification title text.
 * @param {string} req.body.body  Notification body text.
 * @param {Object} req.body.data  Notification data payload for background processing.
 * @param {Object} res            HTTP response object.
 */
exports.triggerCustomNotifications = async (req, res) => {
  const { db, messaging } = require('../_helpers/initialize_admin');

  const {
    pids, title, body, data,
  } = req.body;

  if (!pids || !title || !body || pids.length === 0) {
    console.error(`triggerCustomNotifications invalid body: ${pids} "${title}" "${body}"`);

    res.status(500).send('Invalid function body.');
  }

  try {
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
              'apns-push-type': data ? 'background' : 'alert',
              'apns-priority': data ? '5' : '10',
              'apns-topic': 'com.wavisits.watutors',
            },
            payload: {
              aps: {
                contentAvailable: data ? true : undefined,
                sound: 'default',
              },
            },
          },
          android: {
            priority: data ? 'high' : 'normal',
          },
        }),
      );
    });

    await Promise.allSettled(promiseArrayNested.flat());

    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send(error);
  }
};
