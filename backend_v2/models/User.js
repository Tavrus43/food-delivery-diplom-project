const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['customer', 'owner', 'admin'],
    default: 'customer'
  },
  name: {
    type: String,
  },
  contactInfo: {
    type: String,
    default: 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
