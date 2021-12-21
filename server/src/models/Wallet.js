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
    
    coins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin' 
    }],

    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
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