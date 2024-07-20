const mongoose = require('mongoose');

const user = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  
  email: {
      type: String,
      required: true,
      unique: true
    },

  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
   
  },
  confirmPassword: {
    type: String,
    required: true,
   
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
},
});
module.exports = mongoose.model('Register', user);
