const mongoose = require('mongoose');
const {v4: idGererator} = require('uuid');

/**
 * Model to maintain verification code for email verification
 */

const verificationCodeSchema = mongoose.Schema({
    verificationCode: {
        type: String, 
        default: idGererator(),
        require: true
    },
    accountId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
});

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

module.exports = VerificationCode;