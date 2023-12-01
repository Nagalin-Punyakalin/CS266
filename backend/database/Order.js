const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    orderID: {
        type: Number,
        unique: true,
        required: true,
        default: () => Math.floor(Math.random() * 1000) 
    },
    slipName: String
});

module.exports = mongoose.model('Order', Order);
