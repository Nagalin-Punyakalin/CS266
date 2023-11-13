const router = require('express').Router()
const mongoose = require('mongoose');





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
});

module.exports = router;
