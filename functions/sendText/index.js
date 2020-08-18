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
