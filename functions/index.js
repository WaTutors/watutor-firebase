const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const { createCharge, captureCharge } = require('./Stripe')
const { setPinPage } = require('./setPin')


exports.setPin = functions.https.onCall(setPinPage);

//================================================================================
// One-Off Pages
//================================================================================


//================================================================================
// Stripe
//================================================================================


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



