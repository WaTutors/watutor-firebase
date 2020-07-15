const { buildBackgroundCheckUrl } = require('../_helpers/backgroundCheckApi');

/**
 * Performs tutor background check.
 *
 * @param {Object} data     Object passed to Firebase function 'verifyCredential'.
 *
 * @return {Array<String>}  Array of messages indicating any failures in the
 * processs. If the returned array is empty, then there was no concerning REVIEW
 * information found via Background Check API.
 */
exports.checkBackground = async (data) => {
  // Construct request
  const { legalName, dob, state } = data.cred;
  const legalNameParts = legalName.split(' ');
  const tutorData = {
    firstName: legalNameParts[0],
    lastName: legalNameParts[legalNameParts.length - 1],
    state,
    birthYear: dob.split('-')[0], // dob in yyyy-mm-dd format
    // TODO Reevaluate the use of 'birthYear' here.
    // This is a potential security flaw since no verification is done on birthdays.
  };
  // Send request to Background Check API
  const fetch = require('node-fetch');
  const backgroundCheckUrl = buildBackgroundCheckUrl(tutorData);
  const backgroundCheckResponse = await fetch(backgroundCheckUrl);
  const body = JSON.parse(await backgroundCheckResponse.text());
  let messages = null;
  // Return a list of error messages to indicate failure
  if (body.status.code === '200 OK') {
    messages = body.response.length === 0 ? [] : [body.requests, ...body.response];
  } else {
    messages = [body.status.error];
  }
  return messages;
};
