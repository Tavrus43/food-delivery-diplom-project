const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },  
  description: { 
    type: String,
    required: false,
  },
  cuisines: {
    type: [String],
    required: false,
  },
  menu: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }
  ]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
