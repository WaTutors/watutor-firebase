const NOT_FOUND = 'NOT_FOUND';
const PRIVATE_TRIGGER_TOKEN = 'sdfofjawoijfoisdjfosidjfoisjdfoigerig46898s89guwm98eutojtsertns9t898';

// SECTION google-sheets-helpers
function getJwt() {
  const { google } = require('googleapis');

  const credentials = require('./keys/_watutors-1-spreadsheet-writer-key.json');
  return new google.auth.JWT(
    credentials.client_email, null, credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
  );
}

function getApiKey() {
  const apiKeyFile = require('./keys/_api-key.json');
  return apiKeyFile.key;
}

/**
 * appends data to a google sheets row
 * @link https://googleapis.dev/nodejs/googleapis/latest/sheets/classes/Resource$Spreadsheets$Values.html#append
 * @param {*} jwt
 * @param {*} apiKey
 * @param {*} spreadsheetId
 * @param {*} range
 * @param {*} row
 * // TODO replace callback function with returned so that errors will be seen
 * // TODO @returns {GaxiosPromise<Schema$AppendValuesResponse>}
 */
function appendSheetRow(jwt, apiKey, spreadsheetId, range, row) {
  const { google } = require('googleapis');

  const sheets = google.sheets({ version: 'v4' });
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    auth: jwt,
    key: apiKey,
    valueInputOption: 'RAW',
    resource: { values: [row] },
  }, /* (err, result) => {
    if (err) {
      console.log(`error adding row: ${row}`);
      // throw new Error(`appendSheetRow error:${err.message}`);
      return false;
    }
    return true; // NOTE these aren't returning as expected
  } */
  // eslint-disable-next-line function-paren-newline
  );
}
function appendSheetRows(jwt, apiKey, spreadsheetId, range, rows) { // rows array of array 2D
  const { google } = require('googleapis');

  const sheets = google.sheets({ version: 'v4' });
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    auth: jwt,
    key: apiKey,
    valueInputOption: 'RAW',
    resource: { values: rows },
  }, (err, result) => {
    if (err) {
      console.log(`error adding row: ${rows}`);
      // throw new Error(`appendSheetRow error:${err.message}`);
      return false;
    }
    return true; // NOTE these aren't returning as expected
  });
}

// !SECTION google-sheets-helpers
// SECTION database-parsers

/**
 * parse doc for a session into a object
 * @param {documentSnapshot} doc firestore document snapshot of a session
 * @returns {array} parsed single-depth object to display on google sheets
 */
function parseSessionDocToRowArray(doc) {
  const {
    properties, property,
    start, events,
    provider, consumer,
    providerReferral, consumerReferral,
    isFav,
  } = doc.data();
  return [
    // eslint-disable-next-line no-underscore-dangle
    start ? start._seconds : NOT_FOUND,
    doc.id,
    provider,
    consumer,
    providerReferral,
    consumerReferral,
    property,
    properties ? properties.join(', ') : NOT_FOUND,
    events ? events.join(', ') : NOT_FOUND,
    isFav,
  ];
}
/**
 * parse doc for a session into a object
 * @param {documentSnapshot} doc firestore document snapshot of a session
 * @returns {array} parsed single-depth object to display on google sheets
 */
function parseTutorDocToRowArray(doc) {
  const {
    create,
    grades,
    subjects,
    uid,
    referral,
  } = doc.data();
  return [
    // eslint-disable-next-line no-underscore-dangle
    create ? create._seconds : NOT_FOUND,
    uid,
    referral,
    grades ? grades.join(', ') : NOT_FOUND,
    subjects ? subjects.join(', ') : NOT_FOUND,
  ];
}

/**
 * parse doc for a session into a object
 * @param {documentSnapshot} doc firestore document snapshot of a session
 * @returns {array} parsed single-depth object to display on google sheets
 */
function parseStudentDocToRowArray(doc) {
  const {
    create,
    grade,
    subjects,
    uid,
    referral,
  } = doc.data();
  return [
    // eslint-disable-next-line no-underscore-dangle
    create ? create._seconds : NOT_FOUND,
    uid,
    referral,
    grade,
    subjects ? subjects.join(', ') : NOT_FOUND,
  ];
}

// !SECTION database-parsers
// SECTION main

/**
 * High level explanation.
 *
 * To be run daily to capture
 * Moves data to a google sheets spreadsheet where other automation tools
 * Uses static secret key to avoid public triggers
 *
 * TODO transform into pub/sub task for additional security
 *
 * TODO look into batch updating sheets to reduce errors, use "appendSheetRows(*)"
 *    https://levelup.gitconnected.com/exploring-google-sheets-api-with-node-js-going-on-a-test-drive-1a7a339005ed
 *    https://stackoverflow.com/questions/42751757/add-multiple-rows-to-google-spreadsheet-via-api
 *
 * @since 0.1.0
 *
 * @see otherFunction               this functions is related because
 * @see {CloudTaskName}.{QueueName} if triggered by cloud task via API
 * @tutorial google_sheets
 *  https://stackoverflow.com/questions/44448029/how-to-use-google-sheets-api-while-inside-a-google-cloud-function
 * @tutorial google_cloud_scheduler
 *  https://rominirani.com/google-cloud-functions-tutorial-using-the-cloud-scheduler-to-trigger-your-functions-756160a95c43
 * @link parsing cloud scheduler body (used for token)
 *  https://stackoverflow.com/a/56318457/12334204
 *
 * @returns {200} Formatted html table if successful
 * @returns {200} Error message otherwise
 * @returns {400} 'Invalid' if unauthorized
 */
// @link https://us-central1-watutors-1.cloudfunctions.net/ambassadorDataScrape
exports.ambassadorDataScrape = async (req, res) => {
  const { db, auth } = require('../_helpers/initialize_admin');

  // extract token from body of request
  let token;
  if (req.header('content-type') === 'application/json') {
    ({ token } = req.body);
  } else {
    ({ token } = JSON.parse(req.body));
  }
  // authenticate using token
  if (token !== PRIVATE_TRIGGER_TOKEN) {
    console.error('ambassadorDataScrape token not valid. Found: ', token, req.body);
    res.status(400).send('Not authorized.');
    return;
  }

  // construct date objets for query
  const now = new Date();
  // FIXME change 1 to 24hrs   ~~~~~~~~v
  const dayAgo = new Date(Date.now() - 1 * 60 * 60 * 1000); // subtract 24hr in ms
  console.log(`dates of queries: now:${now} ago:${dayAgo}`);

  // get call sessions that occured in the last 24 hours
  // return promise<array<array>> formatted for the sheets
  const getSessionPromise = db.collection('Schedule')
    .orderBy('start')
    .startAt(dayAgo).endAt(now)
    .get()
    .then((querySnapshot) => {
      const docRows = [];
      querySnapshot.forEach((doc) => {
        docRows.push(parseSessionDocToRowArray(doc));
      });
      // console.log('got session data', docsData);
      return docRows;
    });

  // get tutors added that day
  // return promise<array<array>> formatted for the sheets
  const getTutorPromise = db.collection('tutors')
    .orderBy('create')
    .startAt(dayAgo).endAt(now)
    .get()
    .then((querySnapshot) => {
      const docRows = [];
      querySnapshot.forEach((doc) => {
        docRows.push(parseTutorDocToRowArray(doc));
      });
      // console.log('got session data', docsData);
      return docRows;
    });

  // get students added that day
  const getStudentsPromise = db.collection('students')
    .orderBy('create')
    .startAt(dayAgo).endAt(now)
    .get()
    .then((querySnapshot) => {
      const docRows = [];
      querySnapshot.forEach((doc) => {
        docRows.push(parseStudentDocToRowArray(doc));
      });
      // console.log('got session data', docsData);
      return docRows;
    });

  // execute queries/parsers
  const queryPromiseArray = [
    getSessionPromise, getTutorPromise, getStudentsPromise,
  ];
  const [
    newSessions, newTutors, newStudents,
  ] = await Promise.all(queryPromiseArray)
    .catch((err) => {
      console.error('ambassadorDataScrape promiseArray error:', err);
      res.status(400).json({ a: 'Error parsing', error: err.message });
    });

  // loop through and append scrapped data to google sheets
  // set universal constants
  const jwt = getJwt();
  const apiKey = getApiKey();
  const spreadsheetId = '1EqF13WTZDtbSG9jjypYqxvSBfDSfgxj8JPTQGBiB9C8'; // Ambassador CRM V0
  const writePromiseArray = [
    // appendSheetRows(jwt, apiKey, spreadsheetId, 'batch_raw_tutor!A2',
    //   [[1, 2, 3, 4], [1, 2, 3, 'meirl']]),
  ]; // FIXME

  console.log('newSessions', JSON.stringify(newSessions));
  // prep add add sessions to google sheet
  const sessionRange = 'batch_raw_session!A2'; // 'sessions_batch_raw'; //
  writePromiseArray.push(
    appendSheetRows(jwt, apiKey, spreadsheetId, sessionRange, newSessions),
  );

  // prep add tutors to google sheet
  const tutorRange = 'batch_raw_tutor!A2'; // 'sessions_batch_raw'; //
  writePromiseArray.push(
    appendSheetRows(jwt, apiKey, spreadsheetId, tutorRange, newTutors),
  );

  // prep add students to google sheet
  const studentRange = 'batch_raw_student!A2'; // 'sessions_batch_raw'; //
  writePromiseArray.push(
    appendSheetRows(jwt, apiKey, spreadsheetId, studentRange, newStudents),
  );

  // execute google sheet writes
  await Promise.all(writePromiseArray)
    .then((data) => {
      // console.log('write results', [data]); NTOE data is array of undefined
      res.status(201).json({
        message: 'Finished', startRowStudent: 3, rowTutor: 11, rowSession: 87,
      });
    })
    .catch((err) => {
      console.error('ambassadorDataScrape promiseArray error:', err.message);
      res.status(400).json({ a: 'Error parsing', error: err.message });
    });
};
