const mongoose = require('mongoose')

const address = new mongoose.Schema({
    houseNumber : String,
    village : String,
    alley : String,
    street : String,
    subDistrict : String,
    subArea : String,
    province : String,
    postalCode : String,
    phone : String
  });

module.exports =  mongoose.model('Address',address)

