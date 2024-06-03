module.exports = function (req, res, next) {
    if (req.user.userType !== 'owner') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
  