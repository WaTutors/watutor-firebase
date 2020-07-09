const { getSessionsFromEmail } = require('./sessionFinder');
const { ambassadorDataScrape } = require('./ambassadorDataScrape');
const { approveTutorCredentials } = require('./approveTutor');

module.exports = {
  getSessionsFromEmail,
  ambassadorDataScrape,
  approveTutorCredentials,
};
