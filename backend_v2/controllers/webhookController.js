const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }


  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

  
      try {
        const order = await Order.findOneAndUpdate(
          { _id: session.metadata.orderId },
          { status: 'paid' },
          { new: true }
        );
        if (!order) {
          console.log(`Order not found for session ID: ${session.id}`);
        } else {
          console.log("Order status updated to 'paid'");
        }
      } catch (err) {
        console.error(`Error updating order status: ${err.message}`);
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }


  res.json({ received: true });
};
