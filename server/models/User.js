const mongoose = require('mongoose');
const validator = require('validator')

/**
 * User Model
 */

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email!')
            }
        }
    },

    /**
     * TODO: Make password as required field (maybe)
     */
    
    password: {
        /* password is not required field because of social media */
        type: String, 
        trim: true,
        minlength: 7,
    }, 

    isVerified: {
        type: Boolean,
        require: true,
        default: false
    }
}, 
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;