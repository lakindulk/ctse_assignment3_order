const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({

    buyerID: {
        type: String,
        required: true,
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    cardnumber: {
        type: Number,
        required: true
    },

})

const Order = mongoose.model("Order", orderschema);

module.exports = Order;

