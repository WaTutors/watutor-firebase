/**
 * Finds users based on their phone number
 *
 * @since 2.0.9
 *
 * @link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#getuserbyphonenumber
 *
 * @param {array<string>} param0.numbers  array of phone number strings (E.164 specification)
 *
 * @returns {200} Array of UserRecord
 */
exports.getProfileFromPhoneNumber = async ({ numbers }) => {
  const { auth } = require('../_helpers/initialize_admin');

  const promises = numbers.map((number) => auth.getUserByPhoneNumber(number));
  return promises;
};
