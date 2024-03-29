/**
 * initialize admin sdk
 *
 * necessary to avoid initializing the sdk more than once
 *
 * @link https://bigcodenerd.org/split-cloud-functions-firebase/
 */
const admin = require('firebase-admin');

console.log('Initializing admin SDK...');

admin.initializeApp();

const db = admin.firestore();
const storage = admin.firestore();
const auth = admin.auth();
const messaging = admin.messaging();

module.exports = {
  db, storage, auth, messaging,
};
