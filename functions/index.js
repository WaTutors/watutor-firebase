const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.key);

admin.initializeApp();

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
 * @returns {string}                     "Success" if successfully created charge.
 * @throws  {functions.https.HttpsError} Any error that occurred in Stripe charge creation.
 */
exports.createCharge = functions.https.onCall(
  ({ source, subject = null }) => stripe.charges.create({
    amount: 1500, 
    currency: 'usd',
    description: `${subject ? `${subject} ` : ''}Tutoring Session`,
    source,
    // capture: false, TODO
  })
    .then(({ id }) => {
      // TODO Save the returned charge ID to later be used for capturing the charge.

      return 'Success';
    })
    .catch((error) => {
      throw new functions.https.HttpsError('create-charge-error', error.message, error);
    })
);

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
exports.captureCharge = functions.https.onCall(
  (chargeId) => stripe.charges.capture(chargeId)
    .then(() => 'Success')
    .catch((error) => {
      throw new functions.https.HttpsError('capture-charge-error', error.message, error);
    })
);
