const Payment = require('../models/Payment');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { items, address } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      address,
      paymentMethod: 'stripe',
      totalAmount: items.reduce((total, item) => total + item.price * item.count, 0),
      items: items.map(item => item._id), 
      restaurantId: items[0].restaurantId, 
      status: 'pending',
    });

    const savedOrder = await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.count,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?order_id=${savedOrder._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        orderId: savedOrder._id.toString(),
      },
    });

    savedOrder.stripeSessionId = session.id;
    await savedOrder.save();

    res.json({ id: session.id, orderId: savedOrder._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
