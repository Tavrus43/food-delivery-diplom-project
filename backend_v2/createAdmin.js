const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const createAdmin = async () => {
  const username = 'admin';
  const password = 'adminpassword';
  const userType = 'admin';
  const contactInfo = 'admin@example.com';

  try {
    let user = await User.findOne({ username });
    if (user) {
      console.log('Admin already exists');
      return;
    }

    user = new User({
      username,
      userType,
      contactInfo,
      passwordHash: await bcrypt.hash(password, 10),
    });

    await user.save();
    console.log('Admin created successfully');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createAdmin();
