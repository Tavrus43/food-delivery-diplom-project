const UserAddress = require('../models/UserAddress');


const createAddress = async (req, res) => {
  const { address, zip, isDefault } = req.body;
  try {
    const newAddress = new UserAddress({
      user:req.user.id,
      address,
      zip,
      isDefault,
    });

    const savedAddress = await newAddress.save();
    res.json(savedAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const addresses = await UserAddress.find({ user: req.user.id });
    res.json(addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateAddress = async (req, res) => {
  const { address, zip, isDefault } = req.body;
  try {
    let userAddress = await UserAddress.findById(req.params.id);
    if (!userAddress) return res.status(404).json({ msg: 'Address not found' });

    userAddress = await UserAddress.findByIdAndUpdate(
      req.params.id,
      { address, zip, isDefault },
      { new: true }
    );

    res.json(userAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteAddress = async (req, res) => {
  try {
    let userAddress = await UserAddress.findById(req.params.id);
    if (!userAddress) return res.status(404).json({ msg: 'Address not found' });

    await UserAddress.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Address removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress
};
