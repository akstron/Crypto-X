const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    coins: {
        type: Object
    }
}, 
{
    timestamps: true
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;