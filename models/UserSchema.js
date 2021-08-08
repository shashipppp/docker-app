const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name required to SignUp'],
  },
  password: {
    type: String,
    required: [true, 'Password is required to SignUp'],
  },
});

module.exports = mongoose.model('User', userSchema);