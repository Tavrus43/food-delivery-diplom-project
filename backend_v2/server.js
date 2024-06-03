const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const upload = multer(); 


connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/owner', require('./routes/ownerRoutes'));
app.use('/webhook', require('./routes/webhookRoutes'));
app.use('/api/promos', require('./routes/promoRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Error handling middleware
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

//listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
