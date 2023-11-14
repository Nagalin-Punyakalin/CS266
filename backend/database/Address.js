const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    houseNumber : String,
    villgeNumber : String,
    alley : String,
    street : String,
    subDistrict : String,
    subArea : String,
    province : String,
    postalCode : String,
    phone : String
  });

module.exports =  mongoose.model('Address',addressSchema)

