const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
  },
});
const User = mongoose.model('Password', userSchema);
module.exports = User;
