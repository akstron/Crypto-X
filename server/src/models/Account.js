/**
 * Model for user's bank account
 */

const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    
    contact_id: {
        type: String, 
    },

    name: {
        type: String,
    },

    account_number: {
        type: String,
    },

    ifsc: {
        type: String,
    },

    bank_fund_account_id: {
        type: String,
    },

    UPI_id: {
        type: String,
    },

    vpa_fund_account_id: {
        type: String
    }
}, 
{
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;