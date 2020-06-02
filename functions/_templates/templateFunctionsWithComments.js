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

/** High level explination
 *
 * More detailed multi-line explination
 *
 * @since 0.0.X
 *
 * @see   otherFunction this functions is related because
 * @see   {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @link  https://principlesofchaos.org/?lang=ENcontent
 *
 * @param {Object} data        Object containing target slot ID.
 * @param {Object} data.slotId ID of slot to send incoming call notification for.
 * @param {object} context firebase CallableContext object
 * @returns {string}           "Success" if notification was properly dispatched.
 * @throws  {https.HttpsError} if not authenticated
 */
// from index.js
// exports.triggerOnCall = functions.https.onCall(triggerOnCall);
exports.triggerOnCall = (data, context) => {
  const { example } = require('example') // lazy import to reduce cold start time

  const { slotId } = data;

  // check that user is authenticated
  if (!context.auth) {
    throw new ForbiddenError // imported from _helpers/errors.js
  }
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

/** High level explination
 *
 * More detailed multi-line explination
 *
 * @since 0.0.X
 *
 * @see otherFunction this functions is related because
 * @see {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @link https://principlesofchaos.org/?lang=ENcontent
 *
 * @throws  {https.HttpsError} if not authenticated
 */
// from index.js
// exports.setPin = functions.https.onCall(exampleRequest);
exports.exampleRequest = (data, context) => {
  const { example } = require('example') // lazy import to reduce cold start time

  const { code, email } = data;

  // check authentication credentials
  if (!context.auth)
    throw new ForbiddenError // imported from _helpers/errors.js

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
 * @param {object} Change cloud function interface
 * @param {object} Context cloud function interface
 * @returns {promise} promise chain to send emails then update database
 */
// from index.js
//exports.backgroundExample = functions.firestore
//  .document('{collectionId}/{docId}')
//  .onUpdate(backgroundExample);
exports.sendSlotBookConfirmEmails = async (change) => {
  const { example } = require('example') // lazy import to reduce cold start time

  const { fieldBefore } = change.before.data();
  const { fieldAfter } = change.after.data();

  try {
    await Promise.all(arrayOfPromises);
    return FinalPromise;
  } catch (err) {
    return console.error('something bad happened', { fieldBefore, fieldAfter });
  }
};


