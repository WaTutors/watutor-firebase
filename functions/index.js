const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { createCharge, captureCharge } = require('./stripe');
const setPinPage = require('./setPin');
const testMail = require('./sendEmail');
const { triggerIncomingCall } = require('./notifications');
const {reserve_slots, reservation_Callback } = require('./scheduleReservations')

// // SECTION - One-Off Pages

// /**
//  * Sends pin page
//  *
//  * This should be linked from the student verification email
//  * Publically available
//  *
//  * @since 0.0.5
//  *
//  * @link https://firebase.google.com/docs/functions/http-events#trigger_a_function_with_an_http_request
//  * @link https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/
//  */
// exports.setPin = functions.https.onRequest(setPinPage);

// // !SECTION

// // SECTION - Stripe

// /**
//  * Creates Stripe charge.
//  *
//  * Intakes a Stripe payment source (token generated through credit card or native pay) and charges
//  * the payment information that generated the token $15.00 for a tutoring session, which is labeled
//  * with an optional subject field.
//  *
//  * @since 0.0.1
//  *
//  * @link https://firebase.google.com/docs/functions/callable
//  * @link https://stripe.com/docs/payments/accept-a-payment-charges#web-create-charge
//  * @link https://stripe.com/docs/charges/placing-a-hold#authorize-a-payment
//  *
//  * @param {Object} param0         Object containing source and subject.
//  * @param {string} param0.source  Token generated through credit card or native pay.
//  * @param {string} [subject=null] Optional subject to display in charge description.
//  *
//  * @returns {string}           "Success" if successfully created charge.
//  * @throws  {https.HttpsError} Any error that occurred in Stripe charge creation.
//  */
// exports.createCharge = functions.https.onCall(createCharge);

// /**
//  * Captures a charge.
//  *
//  * Intakes a charge ID generated from the createCharge function and captures the funds from it.
//  * This function should be called programmatically 24 hours after a user's session with a provider
//  * given that no disputes took place. Otherwise, the charge will be automatically released after 7
//  * days.
//  *
//  * @since 0.0.4
//  *
//  * @link https://firebase.google.com/docs/functions/callable
//  * @link https://stripe.com/docs/charges/placing-a-hold#capture-the-funds
//  *
//  * @returns {string}           "Success" if successfully captured charge.
//  * @throws  {https.HttpsError} Any error that occurs during capturing.
//  */
// exports.captureCharge = functions.https.onCall(captureCharge);

// // !SECTION

// // SECTION - Email

// /**
//  * Sends an email.
//  *
//  * Sends an email from the watutors.auto@gmail.com email.
//  *
//  * @since 0.0.5
//  *
//  * @link https://dev.to/akshay090/sending-personalized-email-from-cloud-function-50al
//  *
//  * @returns {string}                     "Success" if successfully captured charge.
//  * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
//  */
// exports.testEmail = functions.https.onRequest(testMail);

// // !SECTION

// // SECTION - Call notifications

// /**
//  * Sends incoming call notification.
//  *
//  * Checks for required slot ID in function call body. Finds target slot from provided ID, creates
//  * notification payload and dispatches iOS or Android notification depending on the notification
//  * ID content.
//  *
//  * @since 0.0.5
//  *
//  * @see  dispatchIOS
//  * @see  dispatchAndroid
//  * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Database#ref
//  * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Reference#once
//  * @link https://firebase.google.com/docs/reference/admin/node/admin.database.DataSnapshot#val
//  *
//  * @param {Object} param0        Object containing target slot ID.
//  * @param {Object} param0.slotId ID of slot to send incoming call notification for.
//  *
//  * @returns {string} "Success" if notification was properly dispatched.
//  * @throws {https.HttpsError} Any error that occurs during sending of notifications or if the
//  *                            function call body is invalid.
//  */
// exports.triggerIncomingCall = functions.https.onCall(triggerIncomingCall);

// // !SECTION

// SECTION - Reservations Scheduler

/**
 * Queues the reservation_Callback function to run 5 minutes later via Google Cloud Tasks.
 * Triggered whenever a document in the Schedule collection is updated.
 * 
 * @param {Object} change      Object containing two snapshots:
 *                  before: Snapshot before the document update
 *                  after: Snapshot after the document update
 * @return {Promise}            null if nothing to do, or a Promise to create a task on the Cloud queue
 */
exports.reserve_slots = functions.firestore.document(`Schedule/{slotId}`).onUpdate(reserve_slots);

/**
 * Sets the reserved field to false in a document with the Schedule collection
 * 
 * @param {Object} req        Object containing the document id to be used
 */
exports.reservation_Callback = functions.https.onRequest((req, res) => { reservation_Callback(req, res, admin); });

// !SECTION