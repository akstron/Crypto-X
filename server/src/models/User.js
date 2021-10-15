/**
 * User Model
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')

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

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String, 
        trim: true,
    },

    isVerified: {
        type: Boolean,
        require: true,
        default: false
    }, 

    pancard: {
        type: String, 
    }, 

    /* Eligibility for trading, true only when pancard is available */
    isEligible: {
        type: Boolean,
        require: true,
        default: false
    },

    watchList: [{
        type: String
    }],

    /* It stores ref to Wallet collection */
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Wallet'
    }
}, 
{
    timestamps: true
});

/* password is deleted before sending it to client */
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

/* Utility function for finding by email */
userSchema.statics.findByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

/* Hashing password before saving it in database */
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;