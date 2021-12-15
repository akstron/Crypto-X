/**
 * Model to maintain verification code for email verification
 * 
 * verificationCode: Generated verification code
 * accountId: User id for which the verificationCode isi required
 */

const mongoose = require('mongoose');
const {v4: idGenerator} = require('uuid');

const verificationCodeSchema = mongoose.Schema({
    verificationCode: {
        type: String, 
        default: idGenerator(),
        require: true
    },
    accountId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
});

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

module.exports = VerificationCode;