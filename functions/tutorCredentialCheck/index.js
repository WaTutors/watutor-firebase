const bucketName = 'watutors-1.appspot.com';

// Simple pattern search through all text in document
// TODO revise
function searchText(text, pattern, start) {
  const minIndex = text.indexOf(pattern, start || 0);
  return minIndex;
}

// SECTION
exports.verifyCredential = async (data) => {
  const { db } = require('../_helpers/initialize_admin');

  const { cert, legalName, state } = data.cred;
  const { uid } = data;
  const legalNameParts = legalName.split(' ');
  const firstName = legalNameParts[0];
  const lastName = legalNameParts[legalNameParts.length - 1];

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

// !SECTION
