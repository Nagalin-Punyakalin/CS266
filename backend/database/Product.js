const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name : String,
    price : Number,
    imageName : String
})

module.exports =  mongoose.model('Product',product)
