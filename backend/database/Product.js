const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name : String,
    price : Number,
    imagePath : String
})

module.exports =  mongoose.model('Product',product)
