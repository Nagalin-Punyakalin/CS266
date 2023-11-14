const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    useraddress : String
  });

module.exports =  mongoose.model('User',addressSchema)
