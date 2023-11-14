const router = require('express').Router();
const User = require('../../../database/User');

router.post('/addressInput', async (req, res) => {
  try {
    const { realname, address, phone } = req.body;
    console.log('Request Body:', req.body);
    const Address = new User({
      realname,
      address,
      phone
    });

    await Address.save();

    res.status(200).json(Address);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
