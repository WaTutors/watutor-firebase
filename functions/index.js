/**
 * cloud functions root
 *
 * see /_templates for writing new functions
 * use lazy imports to reduce cold start time
 *    @link https://firebase.google.com/docs/functions/tips#do_lazy_initialization_of_global_variables
 *    @link https://www.youtube.com/watch?v=v3eG9xpzNXM
 *
 * see README for more information
 */
const functions = require('firebase-functions');

const {
  getDocs, getYaml,
} = require('./docs');
const { getProfileFromPhoneNumber, getPhoneNumberFromProfile } = require('./search');
const {
  welcomeEmailStudent, welcomeEmailTutor, sendSlotBookConfirmEmails,
} = require('./sendEmail');
const { createCharge, captureCharge } = require('./stripe');
const { setPinPage, verifyEmail, postPinAndVerifyEmail } = require('./verifyEmail');
const { triggerIncomingCall, triggerCustomNotifications } = require('./notifications');
const {
  reservationCallbackV2, reserveSlotsV2, reserveSlots, reservationCallback,
} = require('./callSessionEvents');
const { getSessionsFromEmail, ambassadorDataScrape, approveTutorCredentials } = require('./bizDev');
const { verifyCredential, checkBackground } = require('./tutorVerification');
const { testSendTextToBrett, triggerTextMessages } = require('./sendText');

// SECTION Demo Mockup Pages

const { stripeExpressMockUpTemp } = './bizDev/demoMocks';
exports.stripeExpressMockUpTemp = functions.https.onRequest(stripeExpressMockUpTemp);

// !SECTION
// SECTION Text Messages

/**
 * for testing
 * TODO remove
 */
exports.testSendTextToBrett = functions.https.onRequest(testSendTextToBrett);

/**
 * Sends a text message to multiple users
 *
 * @param {string} param0.recipientPhoneNumbers   address of recipient
 * @param {UserIdentifier[]} param0.recipientUsers  array of firebase UserIdentifier
 *    https://firebase.google.com/docs/reference/admin/node/admin.auth#useridentifier
 * @param {string} param0.message          message to be sent
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.triggerTextMessages = functions.https.onCall(triggerTextMessages);

// !SECTION
// SECTION Documentation

/**
 * Viewable documentation
 *
 * powered by redoc
 * @link https://github.com/Redocly/redoc
 * @since 2.0.9
 */
exports.docs = functions.https.onRequest(getDocs);
exports.getYaml = functions.https.onRequest(getYaml);
// !SECTION -------------------------------------------------------------------

// SECTION --------------------------------------------------------------------

/**
 * Verifies tutor's credential
 *
 * NOTE MVP only! These sections should be revised due to quality and security
 *      concerns.
 * TODO Revise & Document
 *
 * @since 0.0.x
 *
 * @link https://firebase.google.com/docs/functions/callable-reference
 * @link https://cloud.google.com/vision/docs/ocr
 */
exports.verifyCredential = functions.https.onCall(verifyCredential);

/**
 * Performs background check.
 *
 * Exact same function as above except without the tutor credentials check. Will be used in place
 * of credential checking for v2.
 *
 * @since 2.0.0
 */
exports.checkBackground = functions.https.onCall(checkBackground);

// !SECTION -------------------------------------------------------------------

// SECTION - Temporary or tester functions (shouldn't be used during deployment)

/**
 * Allows a team member to search for a user's sessions by email address
 *
 * To be used for resolving customer issues and getting the session id
 *    to be used to viewing session video calls in Twilio
 * Authenticated using a secret key to be passed in query
 *
 * @since 0.1.0
 *
 * @see otherFunction               this functions is related because
 * @see {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @link https://principlesofchaos.org/?lang=ENcontent
 *
 * @param {string} req.token  private key
 * @param {string} req.email  email to search for
 * @param {string} req.type   user type. Either "provider" or "consumer"
 *
 * @returns {200} Formatted html table if successful
 * @returns {200} Error message otherwise
 * @returns {400} 'Invalid' if unauthorized
 */
exports.getSessionsFromEmail = functions.https.onRequest(getSessionsFromEmail);

// TODO copy comment
exports.ambassadorDataScrape = functions.https.onRequest(ambassadorDataScrape);

// TODO copy comment
exports.approveTutorCredentials = functions.https.onRequest(approveTutorCredentials);

// SECTION - Stripe

/**
 * Creates Stripe charge.
 *
 * Intakes a Stripe payment source (token generated through credit card or native pay) and charges
 * the payment information that generated the token $15.00 for a tutoring session, which is labeled
 * with an optional subject field.
 *
 * @since 0.0.1
 *
 * @link https://firebase.google.com/docs/functions/callable
 * @link https://stripe.com/docs/payments/accept-a-payment-charges#web-create-charge
 * @link https://stripe.com/docs/charges/placing-a-hold#authorize-a-payment
 *
 * @param {Object} param0         Object containing source and subject.
 * @param {string} param0.source  Token generated through credit card or native pay.
 * @param {string} [subject=null] Optional subject to display in charge description.
 *
 * @returns {string}           "Success" if successfully created charge.
 * @throws  {https.HttpsError} Any error that occurred in Stripe charge creation.
 */
exports.createCharge = functions.https.onCall(createCharge);

/**
 * Captures a charge.
 *
 * Intakes a charge ID generated from the createCharge function and captures the funds from it.
 * This function should be called programmatically 24 hours after a user's session with a provider
 * given that no disputes took place. Otherwise, the charge will be automatically released after 7
 * days.
 *
 * @since 0.0.4
 *
 * @link https://firebase.google.com/docs/functions/callable
 * @link https://stripe.com/docs/charges/placing-a-hold#capture-the-funds
 *
 * @returns {string}           "Success" if successfully captured charge.
 * @throws  {https.HttpsError} Any error that occurs during capturing.
 */
exports.captureCharge = functions.https.onCall(captureCharge);

// !SECTION

// SECTION - Authentication

/**
 * Sets pin from Pin page. TODO deprecate, pin moved to app
 *
 * This should be linked from the student verification email
 * Publically available
 *
 * @since 0.0.5
 * @see welcomeEmailStudent
 *
 * @link https://firebase.google.com/docs/functions/http-events#trigger_a_function_with_an_http_request
 * @link https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/
 */
exports.setPin = functions.https.onRequest(setPinPage);

/**
 * Custom user email verification page
 *
 * sets a user's auth emailVerified field to true
 * requires a header 'token' containing an encrypted uid
 *
 * @since 0.0.7
 * @see welcomeEmailTutor
 *
 * @returns {html}                       website for set pin page
 * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
 */
exports.verifyEmail = functions.https.onRequest(verifyEmail);

/**
 * One-off Pin webpage
 *
 * sets a student/parent's security pin and verifyies their email
 * posted by a one-off cloud function page sent set's a user access pin and
 * confirms privacy policy
 * A token is passed in the body as "key" which should be used to validate and
 * encode the user id
 *
 * originally moved from api
 *
 * @since 0.0.8
 *
 * @see welcomeEmailStudent
 *
 * body:
    pin: Joi.string().required(),
    token: Joi.string().required(),
*/
exports.postPinAndVerifyEmail = functions.https.onRequest(postPinAndVerifyEmail);

/**
 * Finds users based on their phone number
 *
 * @since 2.0.9
 *
 * @link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#getuserbyphonenumber
 */
exports.getProfileFromPhoneNumber = functions.https.onCall(getProfileFromPhoneNumber);

/**
 * Gets phone numbers from user profile
 *
 * @since 2.0.14
 */
exports.getPhoneNumberFromProfile = functions.https.onCall(getPhoneNumberFromProfile);

// !SECTION

// SECTION - Call notifications

/**
 * Sends incoming call notification. TODO convert to onRequest so it can be called by Cloud Task
 *
 * Checks for required slot ID in function call body. Finds target slot from provided ID, creates
 * notification payload and dispatches iOS or Android notification depending on the notification
 * ID content.
 *
 * @since 0.0.6
 *
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Database#ref
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.Reference#once
 * @link https://firebase.google.com/docs/reference/admin/node/admin.database.DataSnapshot#val
 *
 * @param {Object} param0        Object containing target slot ID.
 * @param {Object} param0.slotId ID of slot to send incoming call notification for.
 *
 * @returns {string}          "Success" if notification was properly dispatched.
 * @throws {https.HttpsError} Any error that occurs during sending of notifications or if the
 *                            function call body is invalid.
 */
exports.triggerIncomingCall = functions.https.onCall(triggerIncomingCall);

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
 *
 * @param {Object} param0        Object containing target slot ID.
 * @param {Object} param0.pids   Profile ids to send to
 * @param {Object} param0.title  notification primary text
 * @param {Object} param0.subtitle  notification secondary text
 *
 * @returns {Promise}          All notification promises via Promise.all
 * @throws  {https.HttpsError} Any error that occurs during sending of notifications or if the
 *                             function call body is invalid.
 */
exports.triggerCustomNotifications = functions.https.onCall(triggerCustomNotifications);

// !SECTION

// SECTION - Reservations Scheduler

/**
 * Queues reservationCallback function (for V2 structure)
 *
 * Queues the reservationCallback function to run 5 minutes later via Google Cloud Tasks. Triggered
 * whenever a document in the Schedule collection is updated.
 *
 * @since 2.0.8
 *
 * @see watutors-clear-reservation-queue queue that schedule GCP Tasks flow through
 * @link State Machine Hierarchy, Slide 6/Session SM, Event H https://docs.google.com/presentation/d/1SgZ4KAak3ldCzZqMRm5Y-iLCt0jFQkri_OBnBxkPqPs
 *
 * @param {Object}                     change        Object containing before and after snapshots.
 * @param {firestore.DocumentSnapshot} change.before Snapshot before the document update.
 *
 * @return {Promise} Null if nothing to do, or a Promise to create a task on the Cloud queue
 */
exports.reserveSlotsV2 = functions.firestore.document('Sessions/{slotId}').onUpdate(reserveSlotsV2);

/**
 * Releases reserved slots.
 *
 * Sets the reserved field to false in a document with the Schedule collection. The function is
 * triggered by HTTP requests made to:
 * "https://us-central1-watutors-1.cloudfunctions.net/reservationCallbackV2"
 *
 * @since 2.0.8
 *
 * @param {Object} req Object containing the document ID to be used.
 */
exports.reservationCallbackV2 = functions.https.onRequest((req, res) => {
  reservationCallbackV2(req, res);
});

/**
 * Queues reservationCallback function.
 *
 * Queues the reservationCallback function to run 5 minutes later via Google Cloud Tasks. Triggered
 * whenever a document in the Schedule collection is updated.
 *
 * @since 0.0.7
 *
 * @see  watutors-clear-reservation-queue queue that schedule GCP Tasks flow through
 * @link State Machine Hierarchy: Slide 6/Session SM, Event H https://docs.google.com/presentation/d/1SgZ4KAak3ldCzZqMRm5Y-iLCt0jFQkri_OBnBxkPqPs
 *
 * @param {Object}                     change        Object containing before and after snapshots.
 * @param {firestore.DocumentSnapshot} change.before Snapshot before the document update.
 *
 * @return {Promise} Null if nothing to do, or a Promise to create a task on the Cloud queue
 */
exports.reserveSlots = functions.firestore.document('Schedule/{slotId}').onUpdate(reserveSlots);

/**
 * Releases reserved slots.
 *
 * Sets the reserved field to false in a document with the Schedule collection. The function is
 * triggered by HTTP requests made to:
 * "https://us-central1-watutors-1.cloudfunctions.net/reservationCallback."
 *
 * @since 0.0.7
 *
 * @param {Object} req Object containing the document ID to be used.
 */
exports.reservationCallback = functions.https.onRequest((req, res) => {
  reservationCallback(req, res);
});

// SECTION - Emails

/**
 * sends 'slot booked' confirmations to provider and comsumer emails
 * doc triggered function on write
 * send emails to both provider and comsumer about the slot
 *
 * @since 0.0.8
 *
 * @param {object} Change cloud function interface
 * @param {object} Context cloud function interface
 * @returns {promise} promise chain to send emails then update database
 */
exports.sendSlotBookConfirmEmails = functions.firestore
  .document('Schedule/{slotId}')
  .onUpdate(sendSlotBookConfirmEmails);

/** Sends an email welcoming a student
 * addressed from the watutors.auto@gmail.com email
 * generates validation email from the template
 * email includes a link to validate the account via pinpage
 *
 * @since 0.0.6
 *
 * @param {string} data.toAddress address of recipient
 * @param {string} data.displayName name of the user to display
 * @param {string} data.uid user id
 * @param {object} context firebase CallableContext object
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.welcomeEmailStudent = functions.https.onCall(welcomeEmailStudent);

/** Sends an email welcoming a tutor
 * addressed from the watutors.auto@gmail.com email
 * generates a link to validate account http function
 * email includes a link to validate the account
 *
 * @since 0.0.7
 *
 * @param {object} data
 * @param {string} data.toAddress   address of recipient
 * @param {string} data.displayName name of the user to display
 * @param {string} data.uid         user id
 * @param {object} context          firebase CallableContext object
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.welcomeEmailTutor = functions.https.onCall(welcomeEmailTutor);

// !SECTION
