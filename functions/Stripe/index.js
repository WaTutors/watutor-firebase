const { config, https } = require('../node_modules/firebase-functions');

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
exports.createCharge = ({ source, subject = null, destination }) => {
  const stripe = require('stripe')(config().stripe.key);

  return stripe.charges.create({
    amount: 1500,
    currency: 'usd',
    description: `${subject ? `${subject} ` : ''}Tutoring Session`,
    source,
    capture: false,
    transfer_data: {
      destination,
      amount: 1000,
    },
  })
    .then((charge) => charge.id)
    .catch((error) => {
      console.error(`createCharge failed with ${error.message}`);
      return 'TEST KEY OK'; // FIXME move away from using test key
      // FIXME throw new https.HttpsError('unknown', error.message, error);
    });
};

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
exports.captureCharge = ({ slotId }) => {
  const { db } = require('../_helpers/initialize_admin');
  const stripe = require('stripe')(config().stripe.key);

  if (!slotId) {
    return new https.HttpsError('invalid-argument', 'Falsy slotId.');
  }

  const sessionDoc = db.doc(`Schedule/${slotId}`);
  return sessionDoc.get()
    .then((doc) => doc.data())
    .then((data) => stripe.charges.capture(
      data.private.tranStripeId, // stripe charge id generated in createCharge
    ))
    .then(() => sessionDoc.update({ paid: true }))
    .then(() => 'Success')
    .catch((error) => {
      console.error('captureCharge caught', error);
      throw new https.HttpsError('unknown', error.message, error);
    });
};
