const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Faker, lv } = require('@faker-js/faker');

const faker = new Faker({ locale: [lv] });

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const Review = require('./models/Review');
const UserAddress = require('./models/UserAddress');
const Promo = require('./models/Promo');

require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const cuisinesOptions = ['Itāļu', 'Ķīniešu', 'Indiešu', 'Meksikāņu', 'Japāņu'];

async function seedDatabase() {
  await mongoose.connection.dropDatabase();

  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      username: faker.internet.userName(),
      passwordHash: faker.internet.password(),
      userType: faker.helpers.arrayElement(['customer', 'owner']),
      name: faker.person.fullName(),
      contactInfo: faker.internet.email(),
      avatar: faker.image.avatar() + `?random=${faker.datatype.uuid()}`,
    });
    await user.save();
    users.push(user);
  }

  const restaurants = [];
  for (let i = 0; i < 5; i++) {
    const restaurant = new Restaurant({
      ownerId: faker.helpers.arrayElement(users.filter(u => u.userType === 'owner'))._id,
      name: `Restorāns ${faker.company.name()}`,
      location: 'Rezekne, Latvia',
      avatar: faker.image.food() + `?random=${faker.datatype.uuid()}`,
      description: faker.lorem.paragraph(),
      cuisines: faker.helpers.arrayElements(cuisinesOptions, faker.datatype.number({ min: 1, max: cuisinesOptions.length }))
    });
    await restaurant.save();
    restaurants.push(restaurant);
  }

  const menuItems = [];
  for (let i = 0; i < 20; i++) {
    const menuItem = new MenuItem({
      restaurantId: faker.helpers.arrayElement(restaurants)._id,
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      imageUrl: faker.image.food() + `?random=${faker.datatype.uuid()}`,
    });
    await menuItem.save();
    menuItems.push(menuItem);
  }

  for (let restaurant of restaurants) {
    const items = faker.helpers.shuffle(menuItems).slice(0, 5);
    restaurant.menu = items.map(item => item._id);
    await restaurant.save();
  }

  for (let i = 0; i < 30; i++) {
    const review = new Review({
      userId: faker.helpers.arrayElement(users)._id,
      restaurantId: faker.helpers.arrayElement(restaurants)._id,
      rating: faker.datatype.number({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
    });
    await review.save();
  }

  for (let user of users) {
    const address = new UserAddress({
      user: user._id,
      address: faker.location.streetAddress(),
      zip: faker.location.zipCode(),
      isDefault: true,
    });
    await address.save();
  }

  for (let i = 0; i < 10; i++) {
    const promo = new Promo({
      restaurantId: faker.helpers.arrayElement(restaurants)._id,
      menuItemId: faker.helpers.arrayElement(menuItems)._id,
      discount: faker.datatype.number({ min: 5, max: 50 }),
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
    });
    await promo.save();
  }

  console.log('Database seeded!');
  await createAdmin(); 
  mongoose.disconnect();
}

const createAdmin = async () => {
  const username = 'admin';
  const password = 'adminpassword';
  const userType = 'admin';
  const contactInfo = 'admin@example.com';

  try {
    let user = await User.findOne({ username });
    if (user) {
      console.log('Admin already exists');
      return;
    }

    user = new User({
      username,
      userType,
      contactInfo,
      passwordHash: await bcrypt.hash(password, 10),
    });

    await user.save();
    console.log('Admin created successfully');
  } catch (err) {
    console.error(err.message);
  }
};

seedDatabase();
