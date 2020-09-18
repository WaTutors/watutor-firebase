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
  // Send request to Background Check API
  const fetch = require('node-fetch');

  const backgroundCheckUrl = buildBackgroundCheckUrl(data.cred);

  const backgroundCheckResponse = await fetch(backgroundCheckUrl);

  const body = JSON.parse(await backgroundCheckResponse.text());

  let messages = null;

  // Return a list of error messages to indicate failure
  if (body.status.code === '200 OK') {
    messages = body.response.length === 0 ? [] : [body.requests, ...body.response];
  } else {
    messages = [body.status.error];
  }

  return {
    valid: messages.length === 0 ? 'yes' : 'pending',
    messages,
  };
};
