const express = require('express');
const { stripeWebhook } = require('../controllers/webhookController');
const router = express.Router();

router.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
