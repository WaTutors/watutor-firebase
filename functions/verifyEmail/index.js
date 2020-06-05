const { decrypt } = require('../_helpers/cryptoHelpers');

const { htmlTemplate } = require('./templates/setPinPage');
const { simplePage } = require('../sendEmail/templates');

// helper to parse sample page html
function parseSimplePageHtml({
  title, mainText, link, linkText,
}) {
  let html = simplePage;

  html = html.replace(/###TITLE###/g, title);
  html = html.replace(/###MAINTEXT###/g, mainText);
  html = html.replace(/###LINK###/g, link);
  html = html.replace(/###LINKTEXT###/g, linkText);

  return html;
}

/**
 * Sends pin page
 *
 * This should be linked from the student verification email
 * Publically available
 *
 * @since 0.0.5
 *
 * @link https://firebase.google.com/docs/functions/http-events#trigger_a_function_with_an_http_request
 * @link https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/
 *
 * @returns {html} website for set pin page
 * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
 */
exports.setPinPage = (req, res) => {
  const { code, email } = req.query;

  if (!code || !email) { // TODO regex verify
    return res.status(403).send('Not authorized.');
  }

  // format and send html
  let html = htmlTemplate;
  html = html.replace(/##CODE##/g, code);
  html = html.replace(/##EMAIL##/g, email);

  return res.status(200).send(html);
};


/**
 * DEPRECATED 6/4
 * pin page functionality moved to entirely happen on the app
 *
 * sets a student/parent's security pin and verifyies their email
 * posted by a one-off cloud function page sent set's a user access pin and
 * confirms privacy policy
 * A token is passed in the body as "key" which should be used to validate and
 * encode the user id
 *
 * originally moved from api
 *
 * @since 0.0.8
 * @see welcomeEmailStudent
 *
 * body:
    pin: Joi.string().required(),
    token: Joi.string().required(),
*/
exports.postPinAndVerifyEmail = async (req, res) => {
  const admin = require('firebase-admin');
  admin.initializeApp();

  const db = admin.firestore();

  const { token } = req.body;
  const uid = decrypt(token); // use crypto library with custom key
  const { pin } = req.body;
  console.log("'cryption", token, uid);

  // set up doc
  const studentRef = db.collection('students').doc(uid);
  const updateBody = {
    pin,
    emailConfirm: true,
  };

  // set up promises
  const docPromise = studentRef.set(updateBody, { merge: true });
  const authPromise = admin.auth().updateUser(uid, {
    emailVerified: true,
  });

  try {
    await Promise.all([docPromise, authPromise]);
    return res.status(201).json('Account updated');
  } catch (err) {
    console.error('postPinAndVerifyEmail caught:', err);
    return res.status(500).json('Server Error');
  }
  // TODO verify email address concurrently
};


/**
 * sets a user's auth emailVerified field to true
 * requires a header 'token' containing an encrypted uid
 *
 * @see welcomeEmailStudent
 * @see welcomeEmailTutor
 * @since 0.0.7
 *
 * @returns {html} website for set pin page
 * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
 */
exports.verifyEmail = async (req, res) => {
  const admin = require('firebase-admin');
  admin.initializeApp();

  const { token, type } = req.query;
  const isTutor = (type === 'tutor');
  let uid = '';
  try {
    uid = decrypt(token); // use crypto library with custom key
  } catch (error) {
    console.error('decrypt error:', error);
    return res.status(500).send('Server Error.');
  }

  if (uid.length === 0) { // TODO check exact length
    return res.status(500).send('Server Error.');
  }
  // console.log('Decrypted', { uid });

  // verify email
  try {
    await admin.auth().updateUser(uid, {
      emailVerified: true,
    });
    return res.status(200).send(
      parseSimplePageHtml({ // generate beautiful html
        title: 'Email Verified!',
        mainText: 'You\'re now set up to use WaTutors',
        linkText: `Open ${isTutor ? 'dashboard' : 'app'}`,
        link: isTutor ? 'https://watutors-tutor1.uc.r.appspot.com/' // if tutor, send dashboard link (V1)
          : 'https://watutors.page.link/signUp', // firebase dynamic link by default, linked to "watutors" (V0) project
        // eslint-disable-next-line comma-dangle
      }) // ^ a comma on this line causes a CF outright crash
    );
  } catch (error) {
    console.error('verifyEmail catch:', error, token);
    return res.status(500).send(
      parseSimplePageHtml({
        title: 'Error updating profile.',
        mainText: `Thank you for your patience <br/>
          User id:  ${uid}`,
        linkText: 'Please contact us to manually resolve this issue.',
        link: 'https://watutors.atlassian.net/servicedesk/customer/portal/1',
      }),
    );
  }
};
