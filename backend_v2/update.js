const mongoose = require('mongoose');
const connectDB = require('./config/db'); 
const User = require('./models/User'); 
require('dotenv').config();
const updateUsers = async () => {
  try {
    await connectDB();

   
    const result = await User.updateMany(
      { name: { $exists: false } },
      { $set: { name: 'No Name' } }
    );

    console.log('Documents updated:', result);
  } catch (err) {
    console.error('Error updating documents:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

updateUsers();
