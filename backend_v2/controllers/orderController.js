const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');


exports.createOrder = async (req, res) => {
    const { address, paymentMethod, totalAmount, items, token } = req.body; 
  
    try {
      const newOrder = new Order({
        user: req.user.id,
        address,
        paymentMethod,
        totalAmount,
        items,
        status: 'pending',
      });
  
      const order = await newOrder.save();

      const restaurant = await Restaurant.findById(order.restaurantId).populate('ownerId');
      const ownerId = restaurant.ownerId._id;
      
    
      const newNotification = new Notification({
        userId: ownerId,
        message: `Jauns pasūtījums: Pasūtījuma ID #${order._id}`,
      });

    await newNotification.save()

      if (paymentMethod === 'stripe') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalAmount * 100),
          currency: 'usd', 
          payment_method: token,
          confirm: true,
        });
  
        order.status = 'paid';
        await order.save();
  
        return res.json({
          order,
          clientSecret: paymentIntent.client_secret,
        });
      }
  
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items');
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




exports.getUserOrders = async (req, res) => {
    console.log(req.user);
    console.log(req.user._id); 
    console.log(req.body);
    try {
        const userId = req.user._id;
        console.log('User ID from request:', userId);

      
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error('Invalid User ID:', userId);
            return res.status(400).json({ msg: 'Invalid user ID' });
        }

        const orders = await Order.find({ user: userId })
            .populate('user', 'username')
            .populate('restaurantId', 'name');

        console.log('Orders for user:', orders); 
        res.json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllOrders = async (req, res) => {
    console.log('Received request for all orders');
    try {
      const orders = await Order.find()
        .populate('user', 'username')
        .populate('restaurantId', 'name');
      console.log('Orders fetched:', orders);
      res.json(orders);
    } catch (err) {
      console.error('Error fetching orders:', err.message);
      res.status(500).send('Server error');
    }
  };
  
  