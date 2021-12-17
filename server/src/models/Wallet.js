/**
 * Model for user's wallet
 * 
 * Coins: Info about coins user have and its quantity
 * Transaction: Transaction history
 * costPrice: current money invested in buying coins
 * balance: money available in INR
 */

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