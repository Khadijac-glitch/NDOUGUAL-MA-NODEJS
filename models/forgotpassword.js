const mongoose = require('mongoose');

const ForgotPasswordSchema = new mongoose.Schema({
  email: String,
  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);
