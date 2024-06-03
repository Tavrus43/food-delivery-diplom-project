const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addReview);
router.get('/:restaurantId/reviews', getReviews);

module.exports = router;
