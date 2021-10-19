const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    coins: {
        type: Object
        /*
            symbol: no. of coins
        */
    }, 

    transaction: {
        type: Object
        /*
            symbol: transaction array
        */
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