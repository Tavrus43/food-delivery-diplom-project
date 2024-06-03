const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const uploadImage = require('../utils/cloudinary');
const multer = require('multer');
const upload = multer();

const addMenuItem = async (req, res) => {
  const { restaurantId, name, description, price } = req.body;
  try {
    const newItem = new MenuItem({
      restaurantId,
      name,
      description,
      price,
      imageUrl: req.body.imageUrl || '', 
    });
    const menuItem = await newItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createRestaurant = async (req, res) => {
  const { name, location, description } = req.body;
  try {
    const restaurant = new Restaurant({
      ownerId: req.user.id,
      name,
      location,
      description,
    });
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getRestaurants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const { cuisine, rating, price, popular } = req.query;

    let matchStage = {};

    if (cuisine) {
      matchStage.cuisines = cuisine;
    }

    let pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'restaurantId',
          as: 'reviews'
        }
      },
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: 'restaurantId',
          as: 'menuitems'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          averagePrice: { $avg: '$menuitems.price' }
        }
      }
    ];

    if (rating) {
      pipeline.push({
        $match: { averageRating: { $gte: parseFloat(rating) } }
      });
    }

    if (price) {
      let priceMatch;
      switch (price) {
        case 'low':
          priceMatch = { $lte: 10 };
          break;
        case 'medium':
          priceMatch = { $gt: 10, $lte: 30 };
          break;
        case 'high':
          priceMatch = { $gt: 30 };
          break;
        default:
          break;
      }
      if (priceMatch) {
        pipeline.push({
          $match: { averagePrice: priceMatch }
        });
      }
    }

    if (popular === 'true') {
      pipeline.push({
        $sort: { averageRating: -1 }
      });
    }

    const totalRestaurants = await Restaurant.aggregate([...pipeline, { $count: 'total' }]);
    const totalPages = Math.ceil((totalRestaurants[0]?.total || 0) / limit);

    pipeline.push({ $skip: skip }, { $limit: limit });

    const restaurants = await Restaurant.aggregate(pipeline);

    res.json({
      restaurants,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ msg: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPopularRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'restaurantId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' }
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      { $limit: 3 }
    ]);

    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.params.restaurantId });
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  createRestaurant,
  addMenuItem,
  getRestaurants,
  getRestaurantById,
  getPopularRestaurants,
  getMenuItemsByRestaurant,
  // Другие экспорты
};
