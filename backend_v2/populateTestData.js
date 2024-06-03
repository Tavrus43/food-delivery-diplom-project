const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const Review = require('./models/Review');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const createUsers = async () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      username: faker.internet.userName(),
      passwordHash: faker.internet.password(),
      userType: i < 3 ? 'owner' : 'customer', 
      name: faker.name.fullName(), 
      contactInfo: faker.internet.email(),
      avatar: faker.image.avatar(),
    });
    users.push(user);
  }
  await User.insertMany(users);
  console.log('Users created!');
};

const createRestaurants = async () => {
  const owners = await User.find({ userType: 'owner' });
  const restaurants = [];
  owners.forEach((owner) => {
    for (let i = 0; i < 2; i++) { 
      const restaurant = new Restaurant({
        name: faker.company.name(), 
        location: faker.address.streetAddress(), 
        avatar: faker.image.food(), 
        reviews: [],
        ownerId: owner._id,
      });
      console.log(`Creating restaurant for owner ${owner._id}: ${restaurant}`);
      restaurants.push(restaurant);
    }
  });
  await Restaurant.insertMany(restaurants);
  console.log('Restaurants created!');
};

const createMenuItems = async () => {
  const restaurants = await Restaurant.find();
  const menuItems = [];
  restaurants.forEach((restaurant) => {
    for (let i = 0; i < 10; i++) {
      const menuItem = new MenuItem({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        restaurantId: restaurant._id,
        image: faker.image.food(),
      });
      menuItems.push(menuItem);
    }
  });
  await MenuItem.insertMany(menuItems);
  console.log('Menu items created!');
};

const createReviews = async () => {
  const users = await User.find({ userType: 'customer' });
  const restaurants = await Restaurant.find();
  const reviews = [];

  restaurants.forEach((restaurant) => {
    for (let i = 0; i < 5; i++) {
      const review = new Review({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        restaurantId: restaurant._id,
        rating: faker.datatype.number({ min: 1, max: 5 }), 
        comment: faker.lorem.sentence(),
      });
      reviews.push(review);
      restaurant.reviews.push(review._id);
    }
  });

  await Review.insertMany(reviews);
  for (let restaurant of restaurants) {
    await restaurant.save();
  }
  console.log('Reviews created!');
};

const populateTestData = async () => {
  try {
    await createUsers();
    await createRestaurants();
    await createMenuItems();
    await createReviews();
    console.log('Test data created successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

populateTestData();
