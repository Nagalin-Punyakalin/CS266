const router = require('express').Router();
const Address = require('../../../database/Address');

router.post('/Address', async (req, res) => {
  try {
    const { useraddress } = req.body;
    console.log('Request Body:', req.body);
    const UserAddress = Address({
      useraddress
    })
    await UserAddress.save();

    res.status(200).json(UserAddress);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
