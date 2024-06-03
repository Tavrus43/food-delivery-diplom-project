const express = require('express');
const { createRestaurant, addMenuItem, getRestaurants, getPopularRestaurants, getRestaurantById, getMenuItemsByRestaurant} = require('../controllers/restaurantController');
const { addReview, getReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const ownerMiddleware = require('../middlewares/ownerMiddleware');
const { check, validationResult } = require('express-validator');
const uploadImage = require('../utils/cloudinary');
const router = express.Router();

console.log('createRestaurant:', createRestaurant);
console.log('addMenuItem:', addMenuItem);
console.log('getRestaurants:', getRestaurants);
console.log('getPopularRestaurants:', getPopularRestaurants);
console.log('addReview:', addReview);
console.log('getReviews:', getReviews);

router.post('/',
  authMiddleware,
  ownerMiddleware,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createRestaurant
);

router.post('/menu-item',
  authMiddleware,
  ownerMiddleware,
  async (req, res, next) => {
    try {
      if (req.files && req.files.image) {
        const imagePath = req.files.image.tempFilePath;
        req.body.imageUrl = await uploadImage(imagePath);
      }
      next();
    } catch (error) {
      return res.status(500).json({ msg: 'Failed to upload image', error: error.message });
    }
  },
  [
    check('restaurantId', 'Restaurant ID is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').isFloat({ gt: 0 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addMenuItem
);

router.get('/',  [
  check('page').optional().isInt({ min: 1 }),
  check('limit').optional().isInt({ min: 1 }),
  check('cuisine').optional().isString(),
  check('popular').optional().isBoolean(),
], getRestaurants);
router.get('/popular', getPopularRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:restaurantId/menu-items', getMenuItemsByRestaurant);

router.post('/review',
  authMiddleware,
  [
    check('restaurantId', 'Restaurant ID is required').not().isEmpty(),
    check('comment', 'Comment is required').not().isEmpty(),
    check('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addReview
);

router.get('/:restaurantId/reviews', getReviews);

module.exports = router;
