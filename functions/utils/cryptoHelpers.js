/* eslint-disable no-underscore-dangle */
// Nodejs encryption with CTR
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const _KEY = 'OMC0GlhwDZpBtW3vYsAuLqh2SNy8XzRd'; // secret TODO secure
const _IV = 'PbjBzi584ccc3ert'; // depreciated https://stackoverflow.com/questions/41134562/node-js-crypto-invalid-iv-length

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, _KEY, _IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
};

exports.decrypt = (text) => {
  const encryptedText = Buffer.from(text, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, _KEY, _IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
