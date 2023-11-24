const mongoose = require('mongoose')

const address = new mongoose.Schema({
    name : String,
    surname : String,
    phone : String,
    houseNumber : String,
    village : String,
    alley : String,
    street : String,
    subDistrict : String,
    subArea : String,
    province : String,
    postalCode : String,
  });

module.exports =  mongoose.model('Address',address)

