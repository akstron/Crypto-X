/**
 * Model for storing coin data
 */

const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
    walletId: {
        type: mongoose.Types.ObjectId,
        require: true,
    },

    quantity: {
        type: Number,
        require: true,
        default: 0
    },

    coinType: {
        type: String,
        require: true,
    },

    costPrice: {
        type: mongoose.Types.Decimal128,
        require: true,
        default: 0
    }, 

    sellPrice: {
        type: mongoose.Types.Decimal128,
        require: true,
        default: 0
    }
}, 
{
    timestamps: true
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;