const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.statics.findByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;