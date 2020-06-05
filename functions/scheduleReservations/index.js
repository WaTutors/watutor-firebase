/**
 * Queues reservationCallback function.
 *
 * Queues the reservationCallback function to run 5 minutes later via Google Cloud Tasks. Triggered
 * whenever a document in the Schedule collection is updated.
 *
 * @since 0.0.7
 *
 * @see watutors-clear-reservation-queue queue that schedule GCP Tasks flow through
 * @link State Machine Hierarchy, Slide 6/Session SM, Event H https://docs.google.com/presentation/d/1SgZ4KAak3ldCzZqMRm5Y-iLCt0jFQkri_OBnBxkPqPs
 *
 * @param {Object}                     change        Object containing before and after snapshots.
 * @param {firestore.DocumentSnapshot} change.before Snapshot before the document update.
 *
 * @return {Promise} Null if nothing to do, or a Promise to create a task on the Cloud queue
 */
exports.reserveSlots = async (change) => {
  const { CloudTasksClient } = require('@google-cloud/tasks');

  // Check if we care about this update - we only care if reserved has chagned from false to true.
  if (!(change.before.data().reserved === false && change.after.data().reserved === true)) {
    return null; // Do nothing and return no promises to be finished
  }

  // important variables to set up the Task which we send to Google Tasks
  const project = 'watutors-1'; // projectId
  const location = 'us-central1'; // project location
  const queue = 'watutors-clear-reservation-queue'; // Name used to create cloud tasks queue
  const tasksClient = new CloudTasksClient();
  const queuePath = tasksClient.queuePath(project, location, queue); // Connect to the queue

  // url of the function to be called after `time` amount of time. the function name is
  // reservationCallback, defined below
  const url = `https://${location}-${project}.cloudfunctions.net/reservationCallback`;
  // The function above is called via an HTTP request, so we need to set the payload to the current
  // document we are working with
  const payload = { docId: change.before.ref.path };
  // Time before function is executed (5 minutes, 300 seconds)
  const time = (Date.now() / 1000) + 300;

  // The HTTP(S) request given to Google Cloud Tasks
  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    scheduleTime: {
      seconds: time,
    },
  };

  // taskClient.createTask() returns a promise, so we can return that to run as we pass control
  // back to Firebase
  return tasksClient.createTask({ parent: queuePath, task });
};

/**
 * Releases reserved slots.
 *
 * Sets the reserved field to false in a document with the Schedule collection. The function is
 * triggered by HTTP requests made to:
 * "https://us-central1-watutors-1.cloudfunctions.net/reservation_Callback."
 *
 * @since 0.0.7
 *
 * @param {Object} req Object containing the document ID to be used.
 */
exports.reservationCallback = async (req, res) => {
  const admin = require('../_helpers/firebase_admin');

  try {
    // The reserved field is only used when checking if someone has looked at the document
    // recently, so we always set it to false.
    await admin.firestore().doc(req.body.docId).update({ reserved: false });
    res.send(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
