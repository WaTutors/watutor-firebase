/* eslint-disable camelcase */
const { config, https } = require('../node_modules/firebase-functions');

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
exports.createCharge = ({
  source, subject, destination, price,
}) => {
  const stripe = require('stripe')(config().stripe.key);

  return stripe.charges.create({
    amount: price,
    currency: 'usd',
    description: `${subject} Tutoring Session`,
    source,
    capture: false,
    transfer_data: {
      destination,
      amount: price * (5 / 6),
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
    .then(({ payments: { charges }, info: { price } }) => {
      const amount = price / Object.keys(charges).length; // TODO - subtract discount

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
