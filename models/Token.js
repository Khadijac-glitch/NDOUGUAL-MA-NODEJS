const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: String,
  email: String,
  expiration: Date,
});

module.exports = mongoose.model('Token', TokenSchema);
