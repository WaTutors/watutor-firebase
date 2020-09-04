/* eslint-disable camelcase */
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
exports.createCharge = ({ source, subject, destination }) => {
  const stripe = require('stripe')(config().stripe.key);

  return stripe.charges.create({
    amount: 3000,
    currency: 'usd',
    description: `${subject} Tutoring Session`,
    source,
    capture: false,
    transfer_data: {
      destination,
      amount: 2500,
    },
  })
    .then((charge) => charge.id)
    .catch((error) => {
      console.error(`createCharge failed with ${error.message}`);

      throw new https.HttpsError('unknown', error.message, error);
    });
};

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
exports.captureChargesMulti = ({ sid }) => {
  const { db } = require('../_helpers/initialize_admin');
  const stripe = require('stripe')(config().stripe.key);

  if (!sid) {
    throw new https.HttpsError('invalid-argument', 'sid is required.');
  }

  const sessionDoc = db.doc(`Sessions/${sid}`);

  return sessionDoc.get()
    .then((doc) => doc.data())
    .then((data) => {
      const { charges } = data.payments;

      const amount = 30 / Object.keys(charges).length; // TODO - subtract discount

      return Promise.all(Object.values(charges).map(({ chargeId }) => stripe.charges.capture(
        chargeId, // Stripe Charge ID generated in createCharge
        {
          amount,
          transfer_data: {
            amount: amount * (5 / 6),
          },
        },
      )));
    })
    .then(() => sessionDoc.update({ paid: true }))
    .then(() => 'Success')
    .catch((error) => {
      console.error('captureCharges caught', error);

      throw new https.HttpsError('unknown', error.message, error);
    });
};

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
exports.getAccessToken = ({ code }) => {
  const stripe = require('stripe')(config().stripe.key);

  if (!code) {
    return new https.HttpsError('invalid-argument', 'code is required.');
  }

  return stripe.oauth.token({
    grant_type: 'authorization_code',
    code,
  })
    .then(({ stripe_user_id }) => stripe_user_id)
    .catch((error) => {
      console.error('getAccessToken caught', error);

      throw new https.HttpsError('unknown', error.message, error);
    });
};

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
exports.createLoginLink = ({ pay_key }) => {
  const stripe = require('stripe')(config().stripe.key);

  if (!pay_key) {
    return new https.HttpsError('invalid-argument', 'pay_key is required.');
  }

  return stripe.accounts.createLoginLink(pay_key)
    .then(({ url }) => url)
    .catch((error) => {
      console.error('createLoginLink caught', error);

      throw new https.HttpsError('unknown', error.message, error);
    });
};
