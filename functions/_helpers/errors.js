const functions = require('firebase-functions');


const ForbiddenError = functions.https.HttpsError(
  'failed-precondition',
  'The function must be called while authenticated.',
);


module.exports = {
  ForbiddenError,
};
