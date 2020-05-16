const nodemailer = require("nodemailer");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { encrypt } = require("../utils/cryptoHelpers")
const { student_welcome_template } = require('./templates/student_welcome')
const { student_confirm_template } = require('./templates/student_confirm')
const { tutor_confirm_template } = require('./templates/tutor_confirm')

const moment = require('moment')

// init email global variables
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
/** set up OMTP server
 * @link http://www.google.com/accounts/DisplayUnlockCaptcha
 * @link https://myaccount.google.com/lesssecureapps
 * @link This link is important to enable accesses to google account
 */
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  }
});



// ================================================================================
// Helpers
// ================================================================================

/**
 * send email
 * 
 * @since 0.0.5
 * 
 * @link https://dev.to/akshay090/sending-personalized-email-from-cloud-function-50al
 *
 * @param {Object} param0           Object containing source and subject.
 * @param {string} param0.toAddress address to sent the email to
 * @param {string} param0.html      email html
 * @param {string} param0.displayName name of the user to send email to
 * @param {string} param0.tutorImage optional. if included, will replace ###TUTOR_AVATAR## in html
 * 
 * @returns {string}            Express request resulution/api response
 * @throws  {functions.https.HttpsError} Any error that occurred
 */
function sendEmail({ toAddress, html, subject, tutorImage }) {

  if (tutorImage)
    html = html.replace(/###TUTOR_AVATAR###/g, tutorImage
      || 'https://i2.wp.com/box2127.temp.domains/~watutors/wp-content/plugins/elementor/assets/images/placeholder.png?w=640')

  var mailOptions = {
    from: '"Watutors" <noreply@firebase.com>', // sender address TODO beautify
    to: toAddress, // list of receivers 
    subject: subject, // Subject line 
    html: html // html body
  };

  console.info(
    `Sending mail to ${toAddress} with subject ${subject}`
  );

  return mailTransport.sendMail(mailOptions);
}

/**
 * generate welcome email html
 * 
 * @param {string} param0.link main action link that should provide next step in flow 
 * @returns {string} string html
 */
function generateWelcomeEmailFromTemplate({ link, isTutor }) {
  //TODO custom links
  //    for tutor: link to the set pin call (needs to also verify email)
  //    for student: link to a cloud function that verifies email after check (also need to path auth via url query)

  // parse email from template
  var html = student_welcome_template // init template
  html = html.toString();
  html = html.replace(/###MAINLINK###/g, link)
  html = html.replace(/###BUTTONTEXT###/g, isTutor ?
    'Verify Email Address' : 'Activate my Account and Setup PIN' // change message if tutor
  )
  html = html.replace(/###PREVIEW_TEXT###/g, '')
  html = html.replace(/###TERM_OF_USE_LINK###/g, 'http://watutors.com/terms/')
  html = html.replace(/###FAQ_LINK###/g, 'http://watutors.com/faqs/')
  html = html.replace(/###CONTACT_US_EMAIL###/g, 'info@watutors.com')
  html = html.replace(/###CONTACT_US_PHONE###/g, '') // none
  html = html.replace(/###FACEBOOKLINK###/g, 'www.watutors.com')

  return html
}

/**
 * generate email html from tutorConfirm template
 * for confirming booking of a call
 * 
 * @param {object} param0 object containing personalized variables for use in email
 * @returns {string} fromatted html email
 */
function generateTutorConfirm({
  timestring, grade, subject,
}) { // TODO get template from Hamza

  var html = tutor_confirm_template // init template
  html = html.replace(/###TIMESTRING###/g, timestring)
  html = html.replace(/###DASHBOARD_LINK###/g, 'https://watutorsdash1.uc.r.appspot.com/') // TODO remove default
  html = html.replace(/###Grade###/g, grade)
  html = html.replace(/###Subject###/g, subject)

  // not used? html = html.replace(/###CONTACT_US_PHONE###/g, '')
  html = html.replace(/###CONTACT_US_EMAIL###/g, 'support@watutors.com')
  html = html.replace(/###FAQLINK###/g, 'http://watutors.com/faqs/')
  html = html.replace(/###LOGOLINK###/g, 'www.watutors.com')
  html = html.replace(/###FB_LOGOLINK###/g, 'www.watutors.com')

  return html
}

/**
 * generate email html from studentConfirm template
 * for confirming booking of a call
 * 
 * @param {object} param0 object containing personalized variables for use in email
 * @returns {string} formatted html email
 */
function generateStudentConfirm({
  subject, grade, providerAbout, providerName, timestring
}) {
  // parse email from template
  var html = student_confirm_template // init template
  html = html.toString();

  html = html.replace(/###TUTORNAME###/g, providerName)
  html = html.replace(/###ABOUT###/g, providerAbout // TODO remove default
    || 'I am a licenced tutor who is passionate about teaching. ')
  html = html.replace(/###SUBJECT###/g, subject)
  html = html.replace(/###PREVIEW_TEXT###/g, subject)
  html = html.replace(/###GRADE###/g, grade)
  html = html.replace(/###TIMESTRING###/g, timestring)
  // constants
  html = html.replace(/###CONTACT_US_PHONE###/g, '')
  html = html.replace(/###CONTACT_US_EMAIL###/g, 'support@watutors.com')
  html = html.replace(/###FAQLINK###/g, 'http://watutors.com/faqs/')
  html = html.replace(/###LOGOLINK###/g, 'www.watutors.com')

  return html
}

/**
 * generates token for user
 * 
 * @see encrypt function that encrypts a string using private key 
 * 
 * @param {string} uid the user id to be authenticated by the link
 * @param {string} user type of user. Enum [tutor, student]
 */
function generateAuthLink(uid, user, toAddress = '') {

  /** generate link to pin set page
   * @see /setPin
   */
  if (user === 'student') {
    const baseUrl = 'https://us-central1-wa-tutors.cloudfunctions.net/setPin'
    const token = encrypt(uid)
    return `${baseUrl}?code=${token}&email=${toAddress}`
  }

  else if (user === 'tutor') {
    // TODO finish and deploy verifyEmail
    const baseUrl = 'https://us-central1-wa-tutors.cloudfunctions.net/verifyEmail'
    const token = encrypt(uid)
    return `${baseUrl}?token=${token}`
  }

  // default, error case
  console.error('generateAuthLink default case hit. user:', user)
  return 'www.watutors.com'
}

// ================================================================================
// Exported Functions
// ================================================================================

/** 
 * Sends an email welcoming a student
 * addressed from the watutors.auto@gmail.com email
 * generates validation email from the template
 * email includes a link to validate the account via pinpage
 *
 * @since 0.0.6
 * 
 * @param {string} data.toAddress address of recipient
 * @param {string} data.displayName name of the user to display
 * @param {string} data.uid user id 
 * @param {object} context firebase CallableContext object
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.sendStudentWelcomeEmail = (data, context) => { // for testing use https
  //console.log(gmailEmail, gmailPassword, functions.config())
  const { toAddress, displayName, uid } = data;
  const subject = 'Welcome to Watutors!';

  // check that user is authenticated
  if (!context.auth)
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );

  // ensure data is passed properly
  if (!(typeof displayName === 'string'
    && typeof toAddress === 'string'
    && typeof uid === 'string'
  ))
    throw new functions.https.HttpsError(
      'invalid-arguments',
      'The function must be called with string arguments: displayName, toAddress'
    );

  const link = generateAuthLink(uid, 'student', toAddress)
  const html = generateWelcomeEmailFromTemplate({ link, isTutor: false })

  // send email
  return sendEmail({ toAddress, subject, html });
};


/**
 * Sends an email welcoming a tutor
 * addressed from the watutors.auto@gmail.com email
 * generates a link to validate account http function
 * email includes a link to validate the account
 *
 * @since 0.0.7
 * @link https://firebase.google.com/docs/functions/callable#write_and_deploy_the_callable_function
 * 
 * @param {object} data
 * @param {string} data.toAddress address of recipient
 * @param {string} data.displayName name of the user to display
 * @param {string} data.uid user id 
 * @param {object} context firebase CallableContext object
 *
 * @returns {string}                     "Success" if successfully captured charge.
 * @throws  {functions.https.HttpsError} Any error that occurs
 */
exports.sendTutorWelcomeEmail = (data, context) => { // for testing use https
  //console.log(gmailEmail, gmailPassword, functions.config());
  const subject = 'Welcome to WaTutors!';

  // check that user is authenticated
  if (!context.auth)
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );

  // extract data from context (token passed from caller)
  const { uid } = context.auth
  const { email } = context.auth.token

  const link = generateAuthLink(uid, 'tutor')
  const html = generateWelcomeEmailFromTemplate({ link, isTutor: true })

  // send email
  return sendEmail({ toAddress: email, subject, html });
};

/**
 * sends 'slot booked' confirmations to provider and comsumer emails
 * doc triggered function on write
 * send emails to both provider and comsumer about the slot
 * 
 * @link https://firebase.google.com/docs/functions/firestore-events#event_data
 * @since 0.0.8
 * 
 * @param {object} Change see cloud function interface
 * @param {object} Context see cloud function interface
 * @returns {promise} send emails then update database
 */
exports.sendSlotBookConfirmEmails = (change, context) => {
  const { consumerBefore } = change.before.data()
  const {
    consumer, property, start,
    provider, providerAbout, providerAvatar, providerName,
    consumerEmail, providerEmail,
    emailSent
  } = change.after.data()

  // only send emails if a "reservation" was triggered (add_reservation controller in api)
  // during a reservation 'consumer' field goes from false -> string
  if (consumerBefore // if consumerBefore it truthy it's not 'false' and booking didn't happen
    || typeof consumer !== 'string' // if consumer is not string then update didn't happen
    //|| consumer !== 'f' // test condiditon TODO remove before deployment
    || emailSent // if email already sent, abort. Necessary for ideotempancy 
  ) {
    return null; // cancel culture strikes again
  }

  // format data for email
  const timestring = moment(start.toDate())
    .utcOffset('-08:00') // format for PST
    .format('dddd, MMMM D | LT [PST]') // eg 'Saturday, May 16 | 10:00 a.m. PST'
  const propArray = property.split('_') // parse property, eg '3' or 'Math_7'
  let subject = 'General Ed.'
  let grade = propArray[0]
  if (propArray.length === 2) { // if subject in property
    subject = propArray[0]
    grade = propArray[1]
  }

  // generate email html
  const consumerHtml = generateStudentConfirm({
    subject, grade, providerAbout, providerName, timestring
  })
  const providerHtml = generateTutorConfirm({
    timestring, grade, subject,
  })

  // declare promise vars to sent provider, consumer email
  // and update database
  console.log('send email , providerAvatar')
  const options = {
    action: 'list',
    expires: '03-17-2025'
  };
  const studentEmailPromise = admin.storage()
    .bucket()
    .file(providerAvatar)
    .getSignedUrl(options)
    .then(tutorImage =>
      sendEmail({
        toAddress: consumerEmail,
        html: consumerHtml,
        subject: 'Tutor session booked!',
        tutorImage,
      })
    );
  const tutorEmailPromise = sendEmail({
    toAddress: providerEmail,
    html: providerHtml,
    subject: 'Tutor session booked!'
  });
  const updateDocPromise = change.after.ref.set({
    emailSent: true
  }, { merge: true }); // necessary for ideotempancy

  // send emails concurrently TODO resend on failure
  return Promise.all([studentEmailPromise, tutorEmailPromise])
    .then(() => updateDocPromise) // on email success, update db to ensure function doesn't run twice (ideotempancy)
    .catch((err) => console.error('sendSlotBookConfirmEmails promises failed', err, { consumerEmail, providerEmail }))
}
