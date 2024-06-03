const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uploadImage = require('../utils/cloudinary');
const DEFAULT_AVATAR_URL = 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon';

const createUser = async (req, res) => {
  const { username, password, userType } = req.body;
  const name = req.body.name || 'No Name';
  const contactInfo = req.body.contactInfo || 'Empty';
  let avatar = DEFAULT_AVATAR_URL;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      passwordHash: await bcrypt.hash(password, 10),
      contactInfo,
      userType: userType || 'customer',
      name,
      avatar,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateUserProfile = async (req, res) => {
  const { username, contactInfo, currentPassword, newPassword, name } = req.body;
  const updatedProfile = {};
  if (username) updatedProfile.username = username;
  if (contactInfo) updatedProfile.contactInfo = contactInfo;
  if (name) updatedProfile.name = name;

  try {
    const user = await User.findById(req.user.id);

    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Current password is incorrect' });
      }
      const salt = await bcrypt.genSalt(10);
      updatedProfile.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    if (req.file) {
      const avatarUrl = await uploadImage(req.file.path);
      updatedProfile.avatar = avatarUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedProfile },
      { new: true }
    ).select('-passwordHash');

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const updateUserRole = async (req, res) => {
  const { userId, userType } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.userType = userType;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  try {
    const query = {
      username: { $regex: search, $options: 'i' },
    };

    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.deleteOne();
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (req.file) {
      const avatarUrl = await uploadImage(req.file.path);
      user.avatar = avatarUrl;
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserRole,
  getUsers,
  createUser,
  deleteUser,
  uploadAvatar,
};
