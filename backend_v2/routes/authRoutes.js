const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

console.log('register:', register);
console.log('login:', login);
console.log('getUserProfile:', getUserProfile);

router.post('/register',
  upload.single('avatar'),
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('contactInfo', 'Contact Info is required').not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

router.post('/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
