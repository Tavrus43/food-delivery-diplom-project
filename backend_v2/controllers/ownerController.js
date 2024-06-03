const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const uploadImage = require('../utils/cloudinary');

exports.createOwnerRestaurant = async (req, res) => {
    const { name, location, imageUrl,  description , cuisines} = req.body;
    try {
      const restaurant = new Restaurant({
        ownerId: req.user.id,
        name,
        location,
        avatar: imageUrl,
        description,
        cuisines,
      });
      await restaurant.save();
      res.json(restaurant);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

exports.updateOwnerRestaurant = async (req, res) => {
    const { name, location, imageUrl, description,  cuisines } = req.body;
    try {
      const restaurant = await Restaurant.findOneAndUpdate(
        { ownerId: req.user.id },
        { name, location, avatar: imageUrl , description,  cuisines,},
        { new: true }
      );
      res.json(restaurant);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

exports.deleteOwnerRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOneAndDelete({ ownerId: req.user.id, _id: req.params.id });
        if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
        res.json({ msg: 'Restaurant removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createMenuItem = async (req, res) => {
    const { restaurantId, name, description, price } = req.body;
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadImage(req.file.path);
        }
        const menuItem = new MenuItem({
            restaurantId,
            name,
            description,
            price,
            imageUrl,
        });
        await menuItem.save();
        res.json(menuItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateMenuItem = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadImage(req.file.path);
        }
        const menuItem = await MenuItem.findOneAndUpdate(
            { _id: req.params.id },
            { name, description, price, imageUrl },
            { new: true }
        );
        if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });
        res.json(menuItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findOneAndDelete({ _id: req.params.id });
        if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });
        res.json({ msg: 'Menu item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOwnerRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ ownerId: req.user.id });
        if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOwnerMenuItems = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ ownerId: req.user.id });
        if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
        const menuItems = await MenuItem.find({ restaurantId: restaurant._id });
        res.json(menuItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOwnerOrders = async (req, res) => {
     console.log("Request received to get owner orders");
     console.log("Request user:", req.user);

    try {
      const restaurant = await Restaurant.findOne({ ownerId: req.user.id });
      if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
  
      const orders = await Order.find({ restaurantId: restaurant._id })
      .populate('items')
      .populate('user', 'username');
      res.json(orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    console.log(`Received request to update status to ${status} for order ${req.params.id}`);
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { status },
        { new: true }
      );
      if (!order) {
        console.log(`Order not found for ID: ${req.params.id} and restaurant ID: ${req.user.id}`);
        return res.status(404).json({ msg: 'Order not found' });
      }
      console.log("Order status updated:", order);
      res.json(order);
    } catch (err) {
      console.error(`Error updating order status: ${err.message}`);
      res.status(500).send('Server error');
    }
  };
  