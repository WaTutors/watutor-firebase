const bucketName = 'watutors-1.appspot.com';

// Simple pattern search through all text in document
// TODO revise
function searchText(text, pattern, start) {
  const minIndex = text.indexOf(pattern, start || 0);
  return minIndex;
}

/**
 * Credential check for teaching certificate
 *
 * examines file to determine if it is a valid teaching certificate
 * for the given user. If so, it will update the credential object in
 * their profile
 *
 * @param {string} data.cert filename for teaching certificate
 * @param {string} data.legalFirst legal first name
 * @param {string} data.legalLast filename for teaching certificate
 * @param {string} data.state state the tutor is active in
 * @param {string} data.pid profile id of the user
 */
exports.verifyCredentialTeachingCert = async (data) => {
  const { db } = require('../_helpers/initialize_admin');

  const {
    cert, legalFirst, legalLast, state, uid,
  } = data;

  const firstName = legalFirst;
  const lastName = legalLast;

  // TODO past this point
  // NOTE may not be up to date

  // Get text annotation from Google Cloud Vision API
  const { annotate } = require('../_helpers/googleCloudVision');
  const gcsSourceUri = `gs://${bucketName}/${uid}/cert/${cert}`;
  const gcvResult = await annotate(gcsSourceUri);
  const text = gcvResult.fullTextAnnotation.text.toLowerCase(); // FIXME crashes if empty

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

  // Prepare response and send notification to Support (if necessary)
  const body = {};
  if (messages.length === 0) {
    body.valid = 'yes';
  } else {
    body.valid = 'pending';
    console.log('user invalid');
    body.messages = messages;
    const { manualVerificationEmail } = require('../sendEmail');
    const res = await manualVerificationEmail(uid, messages);
    console.assert(res.accepted.length === 1);
  }

  // set up doc to update the document if approved
  if (body.valid) {
    console.log('updating doc');
    const tutorRef = db.collection('tutors').doc(uid);
    const updateBody = {
      'cred.valid': body.valid,
    };
    await tutorRef.update(updateBody);
  }

  return body;
};
