const nodemailer = require("nodemailer");
const functions = require('firebase-functions');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail || 'watutors.auto@gmail.com',
    pass: gmailPassword || 'Watutors0)'
  }
});

const {welcome} = require('./templates/welcome')

/**
 * Sends an email
 * from the watutors.auto@gmail.com email
 *
 * @since 0.0.5
 * 
 * @param {Express req Object} req       
 * @param {Express res Object} res 
 *
 * @link https://dev.to/akshay090/sending-personalized-email-from-cloud-function-50al
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs during capturing.
 */
//exports.testMail = ({ source, subject = null }) => {
exports.testMail = (req, res)  => { // for testing use https
console.log(gmailEmail,gmailPassword, functions.config())
    const {toAddress, displayName} = req.query;
    const subject = 'Welcome to Watutors! (test)';

    if (!toAddress || !displayName)
      return res.status(400).send('Missing url query params')

    // parse email from template
    var html = welcome // init template
    html = html.toString();
    html = html.replace(/###NAME###/g, displayName); 
    html = html.replace(/###MAINLINK###/g, `"https://us-central1-wa-tutors.cloudfunctions.net/setPin?code=539d2b9bf9f2ec1d1002837a9c258f08&email=${toAddress}"`)
  
    // send email
    return sendEmail({toAddress, displayName, subject, html, res});
  };

    //http://www.google.com/accounts/DisplayUnlockCaptcha
  //https://myaccount.google.com/lesssecureapps
  //This link is important to enable accesses to google account

/**
 * Sends an email
 * from the watutors.auto@gmail.com email
 *
 * @since 0.0.5
 * 
 * @link https://dev.to/akshay090/sending-personalized-email-from-cloud-function-50al
 *
 * @param {Object} param0           Object containing source and subject.
 * @param {string} param0.toAddress address to sent the email to
 * @param {string} param0.html      email html
 * @param {string} param0.displayName name of the user to send email to
 * @param {string} param0.res       express res object
 * 
 * @returns {res Object}            Express requrest resulution
 * @throws  {functions.https.HttpsError} Any error that occurred in Stripe charge creation.
 */
function sendEmail({toAddress, html, displayName, subject, res}) {

  // send email
  var mailOptions = {
    from: '"Watutors" <noreply@firebase.com>', // sender address TODO beautify
    to: toAddress, // list of receivers 
    subject: subject, // Subject line 
    html: html // html body
  };
  try {
    mailTransport.sendMail(mailOptions);
  } catch (error) {
    console.error('There was an error while sending the email:', error);
    return res.status(500).send('Email sending error'+JSON.stringify(error));
  }

  console.log(
    `Sending mail to ${toAddress} with name ${displayName}`
  );
  return res.status(200).send('Email sent!!?');
}