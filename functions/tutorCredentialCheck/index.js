/**
 * Performs tutor background check.
 *
 * @param {Object} data     Object passed to Firebase function 'verifyCredential'.
 *
 * @return {Array<String>}  Array of messages indicating any failures in the
 * processs. If the returned array is empty, then there was no concerning REVIEW
 * information found via Background Check API.
 */
async function checkBackground(data) {
  // Construct request
  const {
    REQUIRE_EXACT_MATCH,
    getBackgroundCheckUrl,
  } = require('../_helpers/backgroundCheckApi');
  const { legalName, dob, state } = data.cred;
  const legalNameParts = legalName.split(' ');
  const tutorData = {
    firstName: legalNameParts[0],
    lastName: legalNameParts[legalNameParts.length - 1],
    state,
    birthYear: dob.split('-')[0], // dob in yyyy-mm-dd format
    exactMatch: REQUIRE_EXACT_MATCH,
  };
  // Send request to Background Check API
  const fetch = require('node-fetch');
  const backgroundCheckUrl = getBackgroundCheckUrl(tutorData);
  const backgroundCheckResponse = await fetch(backgroundCheckUrl);
  const body = JSON.parse(await backgroundCheckResponse.text());
  let messages = null;
  if (body.status.code === '200 OK') {
    messages = body.response.length === 0 ? [] : [body.requests, ...body.response];
  } else {
    messages = [body.status.error];
  }

  return messages;
}

// Simple pattern search through all text in document
// TODO revise search algorithm
// TODO find a good spot for this...
function searchText(text, pattern, start) {
  const minIndex = text.indexOf(pattern, start || 0);
  return minIndex;
}

/**
 * Performs tutor credential check.
 *
 * @param {Object} data     Object passed to Firebase function 'verifyCredential'.
 *
 * @return {Array<String>}  Returns an array of messages indicating any failures
 * in the processs. If the returned array is empty, then the tutur's credential was
 * successfully verified.
 */
async function checkCredential(data) {
  const { cert, legalName, state } = data.cred;
  const { uid } = data;
  const legalNameParts = legalName.split(' ');
  const firstName = legalNameParts[0];
  const lastName = legalNameParts[legalNameParts.length - 1];

  const messages = [];

  // Get text annotation from Google Cloud Vision API
  const bucketName = 'watutors-1.appspot.com';
  const gcsSourceUri = `gs://${bucketName}/${uid}/cert/${cert}`;
  let text = null;
  try {
    const { annotate } = require('../_helpers/googleCloudVision');
    const gcvResult = await annotate(gcsSourceUri);
    if (gcvResult.error) {
      messages.push(`Unnable to annotate image: [${gcvResult.error}]`);
    } else {
      text = gcvResult.fullTextAnnotation.text.toLowerCase(); // NOTE case-insensitive
    }
  } catch (err) {
    messages.push(err);
  }

  // Look for tutor-supplied information in uploaded credential, if credential was annotated
  if (messages.length === 0) {
    // Verify first name occurs in document
    const firstNameIndex = searchText(text, firstName.toLowerCase());
    if (firstNameIndex === -1) {
      messages.push(`Unable to recognize first name '${firstName}' in uploaded document`);
    }
    // Verify last name occurs in document
    const lastNameIndex = searchText(text, lastName.toLowerCase(), firstNameIndex);
    if (lastNameIndex === -1) {
      messages.push(`Unable to recognize last name '${lastName}' in uploaded document`);
    }
    // Verify state name occurs in document
    const stateIndex = searchText(text, state.toLowerCase());
    if (stateIndex === -1) {
      messages.push(`Unable to recognize state '${state}' in uploaded document`);
    }
  }

  return messages;
}

/**
 * Performs tutor credential and background checks.
 *
 * A tutor is considered to have been "verified" if they are cleared via background
 * check and that the personal information they entered matches the information on
 * the tutor's uploaded credential document.
 *
 * TODO The function name should reflect that this does both credential and background checks.
 *
 * @param {Object} data Object passed to Firebase function 'verifyCredential'.
 *
 * @return {Object}     Object containing a 'valid' field indicating that
 * verification was successful ('yes') or that manual review is required
 * ('pending'), plus any relevant failure messages.
 */
exports.verifyCredential = async (data) => {
  // Perform credential check
  let credentialCheckMessages = null;
  try {
    credentialCheckMessages = await checkCredential(data);
  } catch (err) {
    credentialCheckMessages = [err];
  }
  if (credentialCheckMessages.length > 0) {
    const { manualCredentialVerificationEmail } = require('../sendEmail');
    manualCredentialVerificationEmail(data.uid, credentialCheckMessages);
  }
  // Perform background check
  let backgroundCheckMessages = null;
  try {
    backgroundCheckMessages = await checkBackground(data);
  } catch (err) {
    backgroundCheckMessages = [err];
  }
  if (backgroundCheckMessages.length > 0) {
    const { manualBackgroundVerificationEmail } = require('../sendEmail');
    manualBackgroundVerificationEmail(data.uid, backgroundCheckMessages);
  }
  // Construct response body
  const body = {
    valid: credentialCheckMessages.length === 0 && backgroundCheckMessages.length === 0 ? 'yes' : 'pending',
    // REVIEW potential security risks of returning 'messages' property before doing so
    messages: {
      credential: credentialCheckMessages,
      background: backgroundCheckMessages,
    },
  };
  return body;
};
