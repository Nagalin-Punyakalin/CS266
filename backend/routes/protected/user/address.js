const router = require('express').Router();
const Address = require('../../../database/Address');

router.post('/address', async (req, res) => {
  const address = req.body;
  try {
    const UserAddress = new Address({
      houseNumber : address.houseNumber,
      village : address.village,
      alley : address.alley,
      street : address.street,
      subDistrict : address.subDistrict,
      subArea : address.subArea,
      province : address.province,
      postalCode : address.postalCode,
      phone : address.phone
    })
    await UserAddress.save();

    res.status(200).json(UserAddress);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
