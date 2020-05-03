// Dependencies
const { CloudTasksClient } = require('@google-cloud/tasks')

/**
 * Queues the reservation_Callback function to run 5 minutes later via Google Cloud Tasks.
 * Triggered whenever a document in the Schedule collection is updated.
 * 
 * @param {Object} change      Object containing two snapshots:
 *                  before: Snapshot before the document update
 *                  after: Snapshot after the document update
 * @return {Promise}            null if nothing to do, or a Promise to create a task on the Cloud queue
 */
exports.reserve_slots = async (change, context) => {

    // Check if we care about this update - we only care if reserved has chagned from false to true.
    if (!(change.before.data().reserved === false && change.after.data().reserved === true)) {
        return null  // Do nothing and return no promises to be finished
    }

    // important variables to set up the Task which we send to Google Tasks
    const project = 'wa-tutors'  // projectId
    const location = 'us-central1'  // project location
    const queue = 'watutors-cloudtasks-queue'  // Name used to create cloud tasks queue
    const tasksClient = new CloudTasksClient()
    const queuePath = tasksClient.queuePath(project, location, queue)  // Connect to the queue

    // url of the function to be called after `time` amount of time. the function name is reservation_Callback, defined below
    const url = `https://${location}-${project}.cloudfunctions.net/reservation_Callback`
    // The function above is called via an HTTP request, so we need to set the payload to the current document we are working with
    const payload = { docId : change.before.ref.path }
    // Time before function is executed (5 minutes, 300 seconds)
    const time = (Date.now() / 1000) + 300

    // The HTTP request given to Google Cloud Tasks
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
            seconds: time
        }
    }

    // taskClient.createTask() returns a promise, so we can return that to run as we pass control back to Firebase
    return tasksClient.createTask({ parent: queuePath, task })    
}

/**
 * Sets the reserved field to false in a document with the Schedule collection
 * The function is triggered by HTTP requests made to: "https://us-central1-wa-tutors.cloudfunctions.net/reservation_Callback"
 * 
 * 
 * @param {Object} req        Object containing the document id to be used
 */
exports.reservation_Callback = async (req, res, admin) => {
	try {
        // The reserved field is only used when checking if someone has looked at the document recently, so we always set it to false.
        await admin.firestore().doc(req.body.docId).update({ reserved : false })
        res.send(200)
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}
