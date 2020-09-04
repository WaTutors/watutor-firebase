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
  welcomeEmailStudent, welcomeEmailTutor, sendSlotBookConfirmEmails,
} = require('./sendEmail');
const {
  createCharge, captureChargesMulti, getAccessToken, createLoginLink,
} = require('./stripe');
const { setPinPage, verifyEmail, postPinAndVerifyEmail } = require('./verifyEmail');
const { triggerIncomingCall, triggerCustomNotifications } = require('./notifications');
const {
  reservationCallbackV2, reserveSlotsV2, reserveSlots, reservationCallback, updateForwardLink,
} = require('./callSessionEvents');
const {
  getSessionsFromEmail, ambassadorDataScrape, approveTutorCredentials,
} = require('./bizDev');
const { verifyCredential, checkBackground } = require('./tutorVerification');
const { getMinimumOnDemandSessionLength } = require('./onDemand');

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
 * the payment information that generated the token the specified price, with 5/6 of that amount
 * being marked for transfer to the target provider Stripe Connect ID. Does not capture charge.
 *
 * @since 0.0.1
 *
 * @link https://stripe.com/docs/api/charges/create?lang=node
 *
 * @param {string} param0.source      Token generated through credit card or native pay.
 * @param {string} param0.subject     Session property to display in charge description.
 * @param {string} param0.destination Stripe Connect ID of provider to transfer part of charge to.
 * @param {number} param0.price       Price of charge to create.
 *
 * @returns {string}           Charge ID of successfully created charge.
 * @throws  {https.HttpsError} Any error that occurred in charge creation.
 */
exports.createCharge = functions.https.onCall(createCharge);

/**
 * Captures charges.
 *
 * Intakes a session ID of a session to take payment from and captures the respective charges from
 * attending users. Updates the charge amount and transfer amount based on the number of users
 * paying.
 *
 * @since 0.0.4
 *
 * @link https://stripe.com/docs/api/charges/capture?lang=node
 *
 * @returns {string}           "Success" if successfully captured charges.
 * @throws  {https.HttpsError} Any error that occurs during capturing.
 */
exports.captureChargesMulti = functions.https.onCall(captureChargesMulti);

/**
 * Retrieves a Stripe access token.
 *
 * Intakes a Stripe Express Account authorization code returned to the app during Stripe account
 * creation and returns a Stripe access token, completing account creation.
 *
 * @since 2.0.0
 *
 * @link https://stripe.com/docs/connect/oauth-reference
 *
 * @param {Object} param0      Object containing Stripe Express Account authorization code.
 * @param {string} param0.code Stripe Express Account authorization code.
 *
 * @returns {string}           Access token of new Express account.
 * @throws  {https.HttpsError} Any error that occurs during verification.
 */
exports.getAccessToken = functions.https.onCall(getAccessToken);

/**
 * Creates Stripe Express Account login link.
 *
 * Intakes a Stripe Express Account ID from a provider account from the app and returns a temporary
 * granted URL to use to login to the Express Dashboard.
 *
 * @since 2.0.0
 *
 * @link https://stripe.com/docs/connect/express-dashboard
 *
 * @param {Object} param0         Object containing pay_key.
 * @param {string} param0.pay_key Stripe Express Account ID trying to login.
 *
 * @returns {string}           Temporary granted URL to use to login.
 * @throws  {https.HttpsError} Any error that occurs during URL creation.
 */
exports.createLoginLink = functions.https.onCall(createLoginLink);

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
exports.triggerCustomNotifications = functions.https.onRequest(triggerCustomNotifications);

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
 * "https://us-central1-watutors-1.cloudfunctions.net/reservation_Callback."
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

/**
 * Updates Forwards document with video call link.
 *
 * Intakes Forwards document ID and video call link and updates the document with the specified
 * link in order to redirect the user to the video call when joining from the web app.
 *
 * @param {Object} param0      Object containing Forwards document ID and video call link.
 * @param {string} param0.fid  Forwards target document ID.
 * @param {string} param0.link Video call link to redirect to.
 *
 * @returns {string}           "Success" if successfully updated document.
 * @throws  {https.HttpsError} Any error that occurs during body validation or document updating.
 */
exports.updateForwardLink = functions.https.onCall(updateForwardLink);

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

// SECTION - On Demand

/**
 * Returns minimum on demand session length.
 *
 * @since 2.1.0
 *
 * @returns {number} Minimum on demand session length.
 */
exports.getMinimumOnDemandSessionLength = functions.https.onCall(getMinimumOnDemandSessionLength);

// !SECTION
