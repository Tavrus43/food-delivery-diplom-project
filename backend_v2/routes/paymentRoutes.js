const express = require('express');
const { createCheckoutSession } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();



router.post('/create-checkout-session',
  authMiddleware,
  [
    check('items', 'Items are required').isArray({ min: 1 }),
    check('address', 'Address is required').not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createCheckoutSession
);

module.exports = router;
