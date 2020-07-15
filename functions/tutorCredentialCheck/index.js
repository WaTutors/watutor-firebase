const { checkCredential } = require('./credentialCheck');
const { checkBackground } = require('./backgroundCheck');

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
    messages: {
      credential: credentialCheckMessages,
      background: backgroundCheckMessages,
    },
  };
  return body;
};
