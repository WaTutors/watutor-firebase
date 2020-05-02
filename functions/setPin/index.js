const { htmlTemplate } = require('./setPinPage');

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
