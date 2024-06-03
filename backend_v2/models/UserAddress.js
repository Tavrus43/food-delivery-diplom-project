const mongoose = require('mongoose');

const UserAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('UserAddress', UserAddressSchema);
