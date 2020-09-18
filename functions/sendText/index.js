const functions = require('firebase-functions');

/**
 * send text message using Twilio service
 * @param {string} param0.to phone number of recepient
 * @param {string} param0.message text to be sent
 */
async function sendText({ to, message }) {
  try {
    const Twilio = require('twilio');

    // TODO put these in .runtimeconfig
    const accountSid = 'AC24570f8773da2c86d9c66c6419b40a12'; // Your Account SID from www.twilio.com/console
    const authToken = 'd630748948b6191edf07189b1f303f43'; // Your Auth Token from www.twilio.com/console

    const client = new Twilio(accountSid, authToken);
    const twilioPhoneNumber = '+12068884485'; // From a valid Twilio number

    return client.messages.create({
      to,
      body: message,
      from: twilioPhoneNumber,
    })
      .then((res) => console.log('Twilio text message sent: ', res.sid, to, message))
      .catch((error) => console.log('Twilio text message send error', error.message, JSON.stringify(error)));
  } catch (error) {
    console.log('trycatch error caught', error.message);
    console.log(JSON.stringify(error));
    return 'Function main trycatch failed';
  }
}

/**
 * Sends a text message to Brett
 */
exports.getSessionsFromEmail = async (req, res) => {
  const to = '+15033102402';
  const message = 'Sup';

  return sendText({ to, message });
};

/**
 * Sends a text message to Brett
 *
 * @since 2.0.20
 *
 * @see verifyEmail
 *
 * @param {string} data.toAddress   address of recipient
 * @param {string} data.displayName name of the user to display
 * @param {string} data.uid         user id
 * @param {object} context          firebase CallableContext object
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.testSendTextToBrett = () => { // for testing use https
  const to = '+12066048939';
  // const to = '+15033102402';

  const message = `Worried about going back to school in the middle of a pandemic? 
  
Well with WaTutor you don't have to be! Be tutored, be prepared
  
Click this link to start your first session:
https://bit.ly/313aHZn`;

  return sendText({ to, message });
};

/**
 * send a text message to a user
 *
 * utalizes admin getUsers https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#getusers
 *
 * @param {UserIdentifier[]} recipientUsers  firebase UserIdentifier
 * @param {string} message body to be sent
 */
async function sendTextToUsers(recipientUsers, message) {
  const { auth } = require('../_helpers/initialize_admin');

  const { users } = await auth.getUsers(recipientUsers); // parse found users

  return users.map((userRecord) => {
    if (userRecord.phoneNumber) {
      return sendText({ to: userRecord.phoneNumber, message });
    }
    return Promise.resolve(`Phone number not found for user ${userRecord.uid}`);
  });
}

/**
 * send a text message to a user given their pid
 *
 * @param {string} pid  profile document identifier
 * @param {string} message body to be sent
 */
async function sendTextToPid(pid, message) {
  const { db, auth } = require('../_helpers/initialize_admin');
  // get uuid cooresponding to pid from firestore
  const docSnapshot = await db.collection('Profiles').doc(pid).get(); // parse found users
  const { uuid } = docSnapshot.data();
  // get phone number from firbase auth
  const { user } = await auth.getUser(uuid); // parse found users
  const { phoneNumber } = user;

  if (phoneNumber) return sendText({ to: phoneNumber, message });
  return Promise.resolve(`Phone number not found for pid${pid}`);
}

/**
 * Sends a text message to multiple users
 *
 * @since 2.0.20
 *
 * @see verifyEmail
 * @tutorial https://dev.to/vitalets/what-s-wrong-with-promise-allsettled-and-promise-any-5e6o
 *
 * @param {string} param0.recipientPhoneNumbers   address of recipient
 * @param {UserIdentifier[]} param0.recipientUsers  array of firebase UserIdentifier
 *    https://firebase.google.com/docs/reference/admin/node/admin.auth#useridentifier
 * @param {string} param0.message          message to be sent
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.triggerTextMessages = async ({
  recipientPhoneNumbers, recipientPids, recipientUsers, message,
}) => { // for testing use https
  // const to = '+15033102402';
  try {
    const promises = [];
    if (recipientPhoneNumbers) {
      recipientPhoneNumbers.forEach((to) => {
        promises.push(sendText({ to, message }));
      });
    }

    if (recipientUsers) {
      promises.push(sendTextToUsers(recipientUsers, message));
    }

    if (recipientPids) {
      promises.push(
        ...recipientPids.map((pid) => sendTextToPid(pid, message)),
      );
    }

    const results = await Promise.all(
      promises.map((p) => p.catch((e) => e)), // catch any failures, essentiall Promse.allSettled
    );
    console.log('Results', results);
    return results;
  } catch (error) {
    console.log(`Error: ${error.message}`, error);
    return false;
  }
};
