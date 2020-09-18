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
exports.getProfileFromPhoneNumber = async ({
  numbers,
}) => {
  const {
    auth,
  } = require('../_helpers/initialize_admin');

  const promises = numbers.map((number) => auth.getUserByPhoneNumber(number));
  return promises;
};

/**
 * Returns phone numbers based on their uuid
 *
 * @since 2.0.14
 *
 * @link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#getuserbyphonenumber
 *
 * @param {array<string>} param0.numbers  array of phone number strings (E.164 specification)
 *
 * @returns {200} Array of UserRecord
 */
exports.getPhoneNumberFromProfile = async ({
  uuids,
}) => {
  const {
    auth,
  } = require('../_helpers/initialize_admin');

  const promises = uuids.map(async (uuid) => {
    const userRecord = await auth.getUser(uuid);
    if (userRecord) return userRecord.phoneNumber;
    return false; // else
  });

  const safePromises = promises.map((p) => p.catch((e) => e));

  let resp;
  try {
    resp = await Promise.all(safePromises);
  } catch (e) {
    console.error('getPhoneNumberFromProfile allSettled error', JSON.stringify(e));
  }
  return resp;
};
