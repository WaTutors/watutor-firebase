// Simple pattern search through all text in document
// TODO revise search algorithm
// TODO find a good spot for this...
function searchText(text, pattern, start) {
  const textLowerCase = text.toLowerCase(); // NOTE case-insensitive
  const minIndex = textLowerCase.indexOf(pattern, start || 0);
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
exports.checkCredential = async (data) => {
  const { cert, legalName, state } = data.cred;
  const { uid } = data;
  const legalNameParts = legalName.split(' ');
  const firstName = legalNameParts[0];
  const lastName = legalNameParts[legalNameParts.length - 1];

  const messages = [];

  // Get text annotation from Google Cloud Vision API
  const { buildSourceUri } = require('../_helpers/googleCloudStorage');
  const gcsSourceUri = buildSourceUri(uid, cert);
  let text = null;
  try {
    const { annotate } = require('../_helpers/googleCloudVision');
    const gcvResult = await annotate(gcsSourceUri);
    if (gcvResult.error) {
      messages.push(`Unnable to annotate image: [${gcvResult.error}]`);
    } else {
      text = gcvResult.fullTextAnnotation.text;
    }
  } catch (err) {
    messages.push(err);
  }

  // Look for tutor-supplied information in uploaded credential, if credential was annotated
  // TODO refactor to take up less space...
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
};
