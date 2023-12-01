const router = require('express').Router();
const Address = require('../../../database/Address');

router.post('/address', async (req, res) => {
  const address = req.body;

  try {
    const UserAddress = new Address({
      //value . ให้ตรงกับ key ที่เขียนใน hook
      name : address.name,
      surname : address.surname,
      phone : address.phone,
      houseNumber : address.houseNumber,
      village : address.village,
      alley : address.alley,
      street : address.street,
      subDistrict : address.subDistrict,
      subArea : address.subArea,
      province : address.province,
      postalCode : address.postalCode
    })
    await UserAddress.save();

    res.status(201).json({message : 'Your info have been saved'});

  } catch (error) {
    console.error(error);
    res.status(500).json({message : 'Internal Server Error'});
  }
});

module.exports = router;
