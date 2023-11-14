const router = require('express').Router();
const mongoose = require('mongoose');
const Address = require('../../../database/User');

router.post('/addressInput', async (req, res) => {
  try {
    const data = await Address.find();
    
    const mapData = data.map(addressInput => ({
      id : addressInput._id,
      username : addressInput.username,
      address : addressInput.address,
      phone : addressInput.phone
  }));
    res.status(200).json('Successfully added data', mapData);

  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
