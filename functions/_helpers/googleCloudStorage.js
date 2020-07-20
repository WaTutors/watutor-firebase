// SECTION Google Cloud Storage Config
const GoogleCloudStorageConfig = Object.freeze({
  bucketName: 'watutors-1.appspot.com',
});
// !SECTION

exports.buildSourceUri = (uid, cert) => {
  // REVIEW and add
  // if (!uid || !cert) {
  //   throw new Error('Invalid `uid` and/or `cert`.');
  // }
  const { bucketName } = GoogleCloudStorageConfig;
  return `gs://${bucketName}/${uid}/cert/${cert}`;
};
