const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    houseAddress : String,
    streetName: String,
    city: String,
    SubDistrict: String,
    SubArea: String,
    PostalCode : String,
    phone : String
  });

module.exports =  mongoose.model('Address',addressSchema)

