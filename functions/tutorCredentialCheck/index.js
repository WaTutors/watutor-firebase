const bucketName = 'watutors-1.appspot.com';

// Simple pattern search through all text in document
// TODO revise
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
  const gcvResult = await annotate(gcsSourceUri);
  const text = gcvResult.fullTextAnnotation.text.toLowerCase(); // NOTE

  const messages = [];
  // TODO do this less verbosely; foreach?
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

  return messages.length > 0 ? messages : null;
}

function checkBackground(data) {
  // REVIEW There might be a node module which already accomplishes the same thing as 'request'.
  const request = require('request');
  // Construct request
  const { REQUIRE_EXACT_MATCH, getBackgroundCheckUrl } = require('./templates/backgroundCheckApi');
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
  const backgroundCheckUrl = getBackgroundCheckUrl(tutorData);
  let messages = null;
  request(backgroundCheckUrl, (error, response, body) => {
    if (response && response.statusCode === 200) {
      messages = body.response;
    } else {
      messages = [error];
      // TODO status code-specific logic; non-essential, just makes it more robust
    }
  });
  return messages;
}

// TODO The function name should reflect that this does both credential and background checks.
exports.verifyCredential = async (data) => {
  const {
    manualCredentialVerificationEmail,
    manualBackgroundVerificationEmail,
  } = require('../sendEmail');

  const credentialCheckMessages = await checkCredential(data);
  const backgroundCheckMessages = checkBackground(data);

  const body = {};
  if (credentialCheckMessages.length === 0 && backgroundCheckMessages.length === 0) {
    body.valid = 'yes';
  } else {
    body.valid = 'pending';
    // body.messages = credentialCheckMessages + backgroundCheckMessages; REVIEW
    if (credentialCheckMessages.length > 0) {
      manualCredentialVerificationEmail(data.uid, credentialCheckMessages);
    } else {
      manualBackgroundVerificationEmail(data.uid, backgroundCheckMessages);
    }
  }
  return body;
};
