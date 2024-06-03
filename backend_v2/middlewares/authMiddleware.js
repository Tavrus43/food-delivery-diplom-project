const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token, authorization denied');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id).select('-passwordHash');
    if (!req.user) {
      console.log('Authorization denied: User not found');
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    console.log('Authenticated user:', req.user._id);
    next();
  } catch (err) {
    console.error('Token is not valid', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
