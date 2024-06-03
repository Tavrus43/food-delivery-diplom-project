const express = require('express');
const { createOrder, getOrder, getUserOrders, getAllOrders} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();

console.log('createOrder:', createOrder);
console.log('getOrder:', getOrder);
console.log('getUserOrders:', getUserOrders);

router.post('/',
  authMiddleware,
  [
    check('address', 'Address is required').not().isEmpty(),
    check('paymentMethod', 'Payment method is required').not().isEmpty(),
    check('totalAmount', 'Total amount is required').isFloat({ gt: 0 }),
    check('items', 'Items are required').isArray({ min: 1 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createOrder
);
router.get('/user', authMiddleware, getUserOrders);
router.get('/',authMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrder);



module.exports = router;
