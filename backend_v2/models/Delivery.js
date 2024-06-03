const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    deliveryPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    routeInfo: { type: String },
    estimatedTime: { type: Date },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Delivery', DeliverySchema);

