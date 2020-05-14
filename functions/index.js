const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { createCharge, captureCharge } = require('./stripe')
const { setPinPage, verifyEmail, postPinAndVerifyEmail } = require('./verifyEmail')
const {
  sendStudentWelcomeEmail, sendTutorWelcomeEmail,
  sendSlotBookConfirmEmails,
} = require('./sendEmail')


//================================================================================
// QA Functions
//================================================================================


/**
 * Auto-approves tutor
 *
 * Temporary measure, since the QA dashboard is still in development
 *
 * @since 0.0.6
 *
 * @link https://cloud.google.com/firestore/docs/extend-with-functions
 * @link https://www.sitepoint.com/delay-sleep-pause-wait/
 */
exports.auto_approve_tutors = functions.firestore
  .document('tutors/{uid}')
  .onUpdate(async (change, context) => {
    // extract updated document's new data
    const changes = change.after.data()

    // if submitted
    if ('cred' in changes && 'valid' in changes.cred && changes.cred.valid === 'submit') {
      // after 2 seconds, update document
      return new Promise(resolve => setTimeout(resolve, 2000))
        .then(() =>
          change.after.ref // return promise to be evaluated
            .update({
              ['cred.valid']: 'yes'
            })
        );
    } else {
      return
    }
  });


// ================================================================================
// Stripe
// ================================================================================


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
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
 */
exports.captureCharge = functions.https.onCall(captureCharge);

/**
 * Creates Stripe charge.
 *
 * Intakes a Stripe payment source (token generated through credit card or native pay) and charges
 * the payment information that generated the token $15.00 for a tutoring session, which is labeled
 * with an optional subject field.
 *
 * @since 0.0.1
 */
exports.createCharge = functions.https.onCall(createCharge);


//================================================================================
// Authentication
//================================================================================


/**
 * Sends pin page
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
 * sets a user's auth emailVerified field to true
 * requires a header 'token' containing an encrypted uid
 *
 * @since 0.0.7
 * @see welcomeEmailTutor
 *  
 * @returns {html} website for set pin page
 * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
 */
exports.verifyEmail = functions.https.onRequest(verifyEmail);

/**
 * sets a student/parent's security pin and verifyies their email
 * posted by a one-off cloud function page sent set's a user access pin and 
 * confirms privacy policy
 * A token is passed in the body as "key" which should be used to validate and
 * encode the user id
 * 
 * originally moved from api
 * 
 * @since 0.0.8
 * @see welcomeEmailStudent
 * 
 * body: 
    pin: Joi.string().required(),
    token: Joi.string().required(),
*/
exports.postPinAndVerifyEmail = functions.https.onRequest(postPinAndVerifyEmail);

// ================================================================================
// Email
// ================================================================================


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
  .onUpdate(sendSlotBookConfirmEmails)


/** 
 * Sends an email welcoming a student
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
exports.welcomeEmailStudent = functions.https.onCall(sendStudentWelcomeEmail);


/**
 * Sends an email welcoming a tutor
 * addressed from the watutors.auto@gmail.com email
 * generates a link to validate account http function
 * email includes a link to validate the account
 *
 * @since 0.0.7
 * 
 * @param {object} data
 * @param {string} data.toAddress address of recipient
 * @param {string} data.displayName name of the user to display
 * @param {string} data.uid user id 
 * @param {object} context firebase CallableContext object
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.welcomeEmailTutor = functions.https.onCall(sendTutorWelcomeEmail);