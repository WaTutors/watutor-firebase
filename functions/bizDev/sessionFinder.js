const SECRET_TOKEN = 'PkJUa5RLU0MPOJ1dMv57KfQiG5gKcpPm9v61bu3X8vHtFHPwUPGCZePOCNX0bDPwlPiI';


// helper functions
const TABLE_PREFIX = '<div><table class="tg">';
const TABLE_SUFFIX = '</table></div>';
const TABLE_HEAD_PREFIX = '<thead><tr>';
const TABLE_HEAD_SUFFIX = '</tr></thead>';
const TABLE_BODY_PREFIX = '<tbody><tr>';
const TABLE_BODY_SUFFIX = '</tr></tbody>';

function generateTableHead(cols) {
  return `
    ${TABLE_HEAD_PREFIX}
      <td>#</td>
    ${cols.map((col) => `<td>${col}</td>`).join('')}
    ${TABLE_HEAD_SUFFIX}`;
}

function generateTableBody(cols, data) {
  return `
    ${TABLE_BODY_PREFIX}
    ${data.map((object, index) => `
        <tr><td>${index}</td>
        ${cols.map((col) => `<td>${object[col]}</td>`).join('')}
      </tr>`).join('')}
    ${TABLE_BODY_SUFFIX}`;
}

/**
 * generate an html table from an array of objects with the same values
 *
 * @param {array<string>} cols array of object columns used in order of columns on table
 * @param {array<object>} data array of objects containing data in a single depth
 */
function generateTable(data, defaultCols = false) {
  let cols = defaultCols;
  if (!cols) cols = Object.keys(data[0]); // auto generate columns if not defined
  return `
    ${TABLE_PREFIX}
    ${generateTableHead(cols)}
    ${generateTableBody(cols, data)}
    ${TABLE_SUFFIX}`;
}


/**
 * Allows a team member to search for a user's sessions by email address
 *
 * To be used for resolving customer issues and getting the session id
 *    to be used to viewing session video calls in Twilio
 * Authenticated using a secret key to be passed in query
 *
 * @since 0.1.0
 *
 * @see otherFunction               this functions is related because
 * @see {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @link https://principlesofchaos.org/?lang=ENcontent
 *
 * @param {string} req.token  private key
 * @param {string} req.email  email to search for
 * @param {string} req.type   user type. Either "provider" or "consumer"
 *
 * @returns {200} Formatted html table if successful
 * @returns {200} Error message otherwise
 * @returns {400} 'Invalid' if unauthorized
 */
exports.getSessionsFromEmail = async (req, res) => {
  const { db, auth } = require('../_helpers/initialize_admin');
  const { email, token, type } = req.query;
  console.log({ email, token, type });

  if (token !== SECRET_TOKEN) {
    return res.status(400).send('<h3>Invalid!</h3>');
  }

  // get uid from email
  let uid;
  try {
    const userRecord = await auth.getUserByEmail(email);
    uid = userRecord.uid;
  } catch (err) {
    return res.status(200).send(`Error with getting user by email: ${err}`);
  }

  // search sessions for matching UID
  const dbQuery = db.collection('Schedule')
    .where(type, '==', uid);
  const querySnapshot = await dbQuery.get();
  if (querySnapshot.exists) {
    return res.status(200).send(`No sessions found for email: ${email}, uid: ${uid} ${type}`);
  }

  // parse important data (name, time, uid, tutor name/id, property...)
  const data = [];
  querySnapshot.forEach((doc) => {
    const {
      consumer, consumerName, provider, providerName,
      properties, property, start, events,
    } = doc.data();
    data.push({
      consumer,
      consumerName,
      provider,
      providerName,
      providerProperties: properties.join(','),
      selectedProperty: property,
      // eslint-disable-next-line no-underscore-dangle
      'start (epoch)': start && start._seconds,
      events,
      sessionId: doc.id,
    });
  });

  const html = generateTable(data);
  return res.status(200).send(html);
};
