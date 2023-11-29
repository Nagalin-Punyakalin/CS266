const mongoose = require('mongoose');

const purchase = new mongoose.Schema({
        quantity : Number,
        status : String,
        total : Number,
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        orderID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    });

module.exports =  mongoose.model('Purchase', purchase);
