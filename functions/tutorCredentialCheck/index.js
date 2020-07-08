const bucketName = 'watutors-1.appspot.com';

// Simple pattern search through all text in document
// TODO revise search algorithm
// TODO find a good spot for this...
function searchText(text, pattern, start) {
  const minIndex = text.indexOf(pattern, start || 0);
  return minIndex;
}

async function checkCredential(data) {
  const { cert, legalName, state } = data.cred;
  const { uid } = data;
  const legalNameParts = legalName.split(' ');
  const firstName = legalNameParts[0];
  const lastName = legalNameParts[legalNameParts.length - 1];

  // Get text annotation from Google Cloud Vision API
  const { annotate } = require('../_helpers/googleCloudVision');
  const gcsSourceUri = `gs://${bucketName}/${uid}/cert/${cert}`;
  let gcvResult = null;
  try {
    gcvResult = await annotate(gcsSourceUri);
  } catch (err) {
    return [err];
  }
  const text = gcvResult.fullTextAnnotation.text.toLowerCase(); // NOTE case-insensitive

  const messages = [];
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

  return messages;
}

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

// TODO The function name should reflect that this does both credential and background checks.
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
    messages: [
      ...credentialCheckMessages,
      ...backgroundCheckMessages,
    ],
  };
  return body;
};
