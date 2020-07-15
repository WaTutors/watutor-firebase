const APPROVE_TUTOR_SECRET = 'cc88sPkzBayYK2Dz7qI5J8gnPytb1Mjhd8C2D6wv39Ib6OKnLr2';
exports.APPROVE_TUTOR_SECRET = APPROVE_TUTOR_SECRET;

/**
 * URL to approve a tutor
 *
 * Link to approve a tutor
 * A link to this function should be generated if a tutor's credentials
 * check failed. The link activates this function to make manually approving
 * tutors easier.
 * @link https://us-central1-watutors-1.cloudfunctions.net/approveTutorCredentials
 * @see tutorVerification.verifyCredential
 *
 * @param   {string}  req.query.token  secure key
 * @param   {string}  req.query.uid    tutor user id
 * @returns {promise} response
 */
exports.approveTutorCredentials = async (req, res) => {
  const { db } = require('../_helpers/initialize_admin');

  const { token, uid } = req.query;

  if (token !== APPROVE_TUTOR_SECRET) {
    return res.status(400).send('<h3>Not Authorized.</h3>');
  }

  try {
    const tutorRef = db.collection('tutors').doc(uid);
    await tutorRef.update({ 'cred.valid': 'yes' });
    return res.status(200).send('<h3>User Credentials Updated</h3>');
  } catch (err) {
    console.error('approveTutorCredentials threw', err);
    return res.status(500).send('<h3>Server Error</h3>');
  }
};
