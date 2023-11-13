const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    username : String,
    address : String,
    phone : String
  });

module.exports =  mongoose.model('User',addressSchema)
