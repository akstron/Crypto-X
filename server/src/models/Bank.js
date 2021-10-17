const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
    bitcoin: {
        type: Number,
        require: true,
        default: 0
    }
}, 
{
    timestamps: true
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;