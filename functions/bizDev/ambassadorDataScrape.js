const SECRET_TOKEN = 'PkJUa5RLU0MPOJ1dMv57KfQiG5gKcpPm9v61bu3X8vHtFHPwUPGCZePOCNX0bDPwlPiI';


/**
 * High level explanation.
 *
 * More detailed multi-line explanation.
 *
 * @since 0.0.8
 *
 * @see otherFunction               this functions is related because
 * @see {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @tutorial google_sheets
 *  https://stackoverflow.com/questions/44448029/how-to-use-google-sheets-api-while-inside-a-google-cloud-function
 * @tutorial google_cloud_scheduler
 *  https://rominirani.com/google-cloud-functions-tutorial-using-the-cloud-scheduler-to-trigger-your-functions-756160a95c43
 * 
 * @returns {200} Formatted html table if successful
 * @returns {200} Error message otherwise
 * @returns {400} 'Invalid' if unauthorized
 */
exports.ambassadorDataScrape = async (req, res) => {
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
    console.log('sdfa', doc.data());
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
