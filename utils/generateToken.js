const crypto = require('crypto');

function generateUniqueToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = generateUniqueToken;
