const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { restaurantId, comment, rating } = req.body;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });

    const newReview = new Review({
      userId: req.user.id,
      restaurantId,
      comment,
      rating,
    });

    const review = await newReview.save();

    if (!restaurant.reviews) {
      restaurant.reviews = [];
    }
    restaurant.reviews.push(review._id);
    await restaurant.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId }).populate('userId', 'username avatar');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
