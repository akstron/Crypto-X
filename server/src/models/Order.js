/**
 * Model for Orders
 * 
 * orderType: Either sell or buy
 * coinType: Type of coin 
 * price: price per coin in a bid
 * quantity: no. of coins in a bid,
 * completed: no. of coins sold/bought
 */

 
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },

    orderType: {
        type: String,
        require: true
    },

    coinType: {
        type: String,
        require: true,
    },

    price: {
        type: mongoose.Types.Decimal128,
        require: true
    },

    quantity: {
        type: mongoose.Types.Decimal128,
        require: true,
    },

    completed: {
        type: mongoose.Types.Decimal128,
        require: true,
    }   
}, 
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;