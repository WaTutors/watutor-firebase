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
  })
    .then(() => 'Success')
    .catch((error) => {
      throw new functions.https.HttpsError('create-charge-error', error.message, error);
    })
);
