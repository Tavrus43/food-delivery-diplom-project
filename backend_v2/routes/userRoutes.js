const express = require('express');
const { getUserProfile, updateUserProfile, updateUserRole, getUsers, createUser, deleteUser, uploadAvatar } = require('../controllers/userController');
const { createAddress, getUserAddresses, updateAddress, deleteAddress } = require('../controllers/userAddressController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

console.log('getUserProfile:', getUserProfile);
console.log('updateUserProfile:', updateUserProfile);
console.log('updateUserRole:', updateUserRole);
console.log('createAddress:', createAddress);
console.log('getUserAddresses:', getUserAddresses);
console.log('updateAddress:', updateAddress);
console.log('deleteAddress:', deleteAddress);

router.get('/me', authMiddleware, getUserProfile);

router.put('/me',
  authMiddleware,
  [
    check('username', 'Username is required').optional().not().isEmpty(),
    check('contactInfo', 'Contact Info is required').optional().not().isEmpty(),
    check('password', 'Password should be at least 6 characters').optional().isLength({ min: 6 }),
    check('name', 'Name is required').optional().not().isEmpty(), // Добавляем проверку для имени
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  upload.single('avatar'),
  updateUserProfile
);

router.put('/role',
  authMiddleware,
  adminMiddleware,
  [
    check('userId', 'User ID is required').not().isEmpty(),
    check('userType', 'User Type is required').not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUserRole
);

router.post('/address',
  authMiddleware,
  [
    check('address', 'Address is required').not().isEmpty(),
    check('zip', 'ZIP code is required').not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createAddress
);

router.get('/addresses', authMiddleware, getUserAddresses);

router.put('/address/:id',
  authMiddleware,
  [
    check('address', 'Address is required').optional().not().isEmpty(),
    check('zip', 'ZIP code is required').optional().not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateAddress
);

router.delete('/address/:id', authMiddleware, deleteAddress);

router.get('/', authMiddleware, adminMiddleware, getUsers);

router.post('/create',
  authMiddleware,
  adminMiddleware,
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('userType', 'User Type is required').not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUser
);

router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

router.post('/avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

module.exports = router;
