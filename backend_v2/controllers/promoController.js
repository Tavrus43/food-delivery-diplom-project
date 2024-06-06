const Promo = require('../models/Promo');

exports.createPromo = async (req, res) => {
  const { restaurantId, menuItemId, discount, startDate, endDate } = req.body;
  try {
    const newPromo = new Promo({
      restaurantId,
      menuItemId,
      discount,
      startDate,
      endDate,
    });

    const savedPromo = await newPromo.save();
    res.json(savedPromo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPromos = async (req, res) => {
  try {
    const promos = await Promo.find()
      .populate('menuItemId', 'name imageUrl description price')
      .populate('restaurantId', 'name');
    res.json(promos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePromo = async (req, res) => {
  try {
    await Promo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Promo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
