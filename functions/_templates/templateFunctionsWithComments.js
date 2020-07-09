/* eslint-disable */ 

/**
 * this document contains useful cloud function templates
 */


// SECTION - onCall

/**
 * these are the most common cloud functions
 * they are easily callable by frontends and API
 *
 * they are abstracted onRequest functions following a
 * specific protocol specification
 * @link https://firebase.google.com/docs/functions/callable-reference
 */

/**
 * High level explanation.
 *
 * More detailed multi-line explanation.
 *
 * @since 0.0.X
 *
 * @see  otherFunction               this functions is related because
 * @see  {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @link https://principlesofchaos.org/?lang=ENcontent
 *
 * @param {Object} data        Object containing target slot ID.
 * @param {Object} data.slotId ID of slot to send incoming call notification for.
 * @param {Object} context     firebase CallableContext object
 *
 * @returns {string}             "Success" if notification was properly dispatched.
 * @throws  {https.HttpsError}   if not authenticated
 */
// from index.js
// exports.triggerOnCall = functions.https.onCall(triggerOnCall);
exports.triggerOnCall = (data, context) => {
  const { example } = require('example'); // lazy import to reduce cold start time

  const { slotId } = data;

  /**
   * stuff
   * things
   * maybe code?
   * probably safer to just write comments
   */

  // (optional) Returning message to the client.
  return { text: message };
};

// !SECTION

// SECTION - onRequest

/**
 * these are functions called by
 *
 * they are abstracted onRequest functions following a
 * specific protocol specification
 * @link https://firebase.google.com/docs/functions/callable-reference
 */

/**
 * High level explanation.
 *
 * More detailed multi-line explanation.
 *
 * @since 0.0.X
 *
 * @see otherFunction               this functions is related because
 * @see {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @link https://principlesofchaos.org/?lang=ENcontent
 */
// from index.js
// exports.setPin = functions.https.onRequest(exampleRequest);
exports.exampleRequest = async (req, res) => {
    const { db, auth } = require('../_helpers/initialize_admin');
  
    const { token } = req.body;
    const uid = decrypt(token); // use crypto library with custom key
    const { pin } = req.body;

  /**
   * stuff
   * things
   * maybe code?
   * probably safer to just write comments
   */
  return res.status(200).send('<h3>DONE</h3>');
};

// !SECTION

// SECTION - Background functions

/**
 * these are functions called by background triggers
 * their use should be minimized to limit vendor lock-in
 *
 * for example firestore events
 * @link https://firebase.google.com/docs/functions/firestore-events
 */

/**
 * example of a firestore update
 *
 * @since 0.0.X
 *
 * @param {Object} change  cloud function interface
 * @param {Object} context cloud function interface
 *
 * @returns {Promise} promise chain to send emails then update database
 */
// from index.js
// exports.backgroundExample = functions.firestore
//  .document('{collectionId}/{docId}')
//  .onUpdate(backgroundExample);
exports.sendSlotBookConfirmEmails = async (change) => {
  const { example } = require('example'); // lazy import to reduce cold start time

  const { fieldBefore } = change.before.data();
  const { fieldAfter } = change.after.data();

  try {
    await Promise.all(arrayOfPromises);
    return FinalPromise;
  } catch (err) {
    return console.error('something bad happened', { fieldBefore, fieldAfter });
  }
};
