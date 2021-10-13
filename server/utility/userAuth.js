const nodemailer = require('nodemailer');

const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');

/* Utility function for checking mail in database */
const isEmailAvailable = async (email) => {
    const user = await User.findByEmail(email);
    if(user) return true;
    return false;
}

/* Sending OTP */
const sendVerificationCode = async (email, code) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_SENDER_NAME,
        to: email,
        subject: 'Email confirmation',
        html: `OTP = ${code}`
    };

    transport.sendMail(mailOptions, (error, response) => {
        if(error) throw error;
        console.log(response);
    })
}

/**
 * 
 * TODO: Make signUp process a transaction 
 * 
 */

module.exports.SignUp = async (req, res) => {
    const {email, password} = req.body;

    console.log(req.body);
    
    try{
        const emailAlreadyExist = await isEmailAvailable(email);
        if(emailAlreadyExist){
            return res.status(409).json({
                status: false,
                error: 'Email already registered'
            });
        }

        const user = new User({
            email,
            password
        });

        const vc = new VerificationCode({
            accountId: user._id
        })

        
        sendVerificationCode(email, vc.verificationCode);

        await vc.save();
        await user.save();

        return res.json({
            status: true,
        })

    } catch(e){
        /* Catch server errors only */
        console.log(e);
        res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
    
}

/**
 * TODO: Make VerifyUser as transaction
 */

module.exports.VerifyUser = async (req, res) => {
    const {email, verificationCode} = req.body;

    try{
        const vc = await VerificationCode.findOne({verificationCode});
        if(!vc) {
            return res.status(406).json({
                status: false,
                error: 'Wrong email or code'
            })
        }

        const vcUser = await User.findById(vc.accountId);
        if((!vcUser) || vcUser.email !== email){
            return res.status(406).json({
                status: false,
                error: 'Wrong email or code.'
            })
        } 

        vcUser.isVerified = true;
        await vcUser.save();
    
        await VerificationCode.findByIdAndDelete(vc._id);

        res.json({
            status: true,
        });

    } catch(e){

        console.log(e);
        res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
}
