const mongoose = require('mongoose');

const purchase = new mongoose.Schema({
        quantity : Number,
        status : String,
        total : Number,
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    });

module.exports =  mongoose.model('Purchase', purchase);
