const router = require('express').Router()
const mongoose = require('mongoose');

<<<<<<< HEAD
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Address = mongoose.model('Address', addressSchema);

// API endpoint to add an address
router.post('/addAddress', async (req, res) => {
  try {
    const { username, address, phone } = req.body;

    const newAddress = new Address({
      username,
      address,
      phone,
    });

    await newAddress.save();
    res.status(200).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).send('Internal Server Error');
  }
=======
router.post('/addAddress', (req, res) => { 
  res.sendStatus(200)
>>>>>>> d49c9f2d78b3f5d10bc50073bbbc59e3e12d4ab5
});

module.exports = router;
