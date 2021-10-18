const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    coins: {
        type: Object
    }, 

    transaction: {
        type: Object
    },

    costPrice: {
        type: Number,
        require: true,
        default: 0
    }, 

    balance: {
        type: Number, 
        require: true,
        default: 0
    }
}, 
{
    timestamps: true
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;