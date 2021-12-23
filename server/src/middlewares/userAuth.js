/**
 * Middlewares related to authentication 
 */

const nodemailer = require('nodemailer');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');
const Wallet = require('../models/Wallet');
const Coin = require('../models/Coin');
const Account = require('../models/Account');
const {createContact} = require('../utils/payment');

/* Utility function for checking mail in database */
const isEmailAvailable = async (email) => {
    const user = await User.findByEmail(email);
    if(user) return true;
    return false;
}

/* Sending OTP */
const sendVerificationCode = async (email, code) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
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
    
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, response) => {
            if(error) return reject(error);
            resolve(response);
        });
    })
}

/* SignUp middlewaer */
module.exports.SignUp = async (req, res) => {
    const {email, password, firstName, lastName, referralCode} = req.body;

    console.log(req.body);
    const session = await mongoose.startSession();
    
    try{
        session.startTransaction();
        const emailAlreadyExist = await isEmailAvailable(email);
        if(emailAlreadyExist){
            session.abortTransaction();
            session.endSession();
            return res.status(409).json({
                status: false,
                error: 'Email already registered'
            });
        }

        /* When creating objects with new in session, automatic _id is not generated */        

        const walletId = mongoose.Types.ObjectId();
        const accountId = mongoose.Types.ObjectId();

        var balance = 0;

        const referralUser = await User.findOne({referralCode}).session(session);
        if(referralUser){
            balance = 100;
   
            const walletId = referralUser.wallet;
            const referralWallet = await Wallet.findById(walletId).session(session);
            referralWallet.balance = parseFloat(parseFloat(referralWallet.balance) + 100);
            await referralWallet.save();
        }

        await Wallet.create([{
            _id: walletId,
            coins: [], 
            account: accountId, 
            balance: parseFloat(balance)
        }], {session});

        const userId = mongoose.Types.ObjectId();

        const userArray = await User.create([{
            _id: userId,
            email,
            password,
            firstName, 
            lastName,
            wallet: walletId,
            watchList: []
        }], {session});

        /**
         * CREATE CONTACT CALL
         */
		const response = await createContact(userArray[0]);
        const contact_id = JSON.parse(response).id;
        console.log('contact_id',contact_id);
        
        await Account.create([{
            _id: accountId,
            contact_id
        }], {session});


        const vc = await VerificationCode.create([{
            accountId: userId
        }], {session});
        
        console.log('Before verification code');
        await sendVerificationCode(email, vc[0].verificationCode);

        console.log('After verification code');

        await session.commitTransaction();
        session.endSession();

        return res.json({
            status: true,
            message: 'Signed up successfully'
        });

    } catch(e){
        /* Catch server errors only */
        /* Abort transaction in case of error */
        await session.abortTransaction();
        session.endSession();
        console.log('error: ' + e);

        res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
    
}

module.exports.VerifyUser = async (req, res) => {
    const {email, verificationCode} = req.body;

    console.log(req.body);

    const session = await mongoose.startSession();

    try{
        /* Start transaction */
        session.startTransaction();

        const vc = await VerificationCode.findOne({verificationCode}).session(session);
        if(!vc) {
            await session.abortTransaction();
            session.endSession();
            return res.status(406).json({
                status: false,
                error: 'Wrong email or code'
            })
        }

        const vcUser = await User.findById(vc.accountId).session(session);
        if((!vcUser) || vcUser.email !== email){

            await session.abortTransaction();
            session.endSession();
            return res.status(406).json({
                status: false,
                error: 'Wrong email or code.'
            })
        } 

        vcUser.isVerified = true;
        await vcUser.save();
    
        /* Delete verification code after verifying */
        await VerificationCode.findByIdAndDelete(vc._id).session(session);

        await session.commitTransaction();
        session.endSession();

        res.json({
            status: true,
        });

    } catch(e){

        console.log(e);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
}

module.exports.LogIn = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {

        console.log('session below');
        console.log(req.session);
   

        if (error) { 
            return res.status(500).json({
                status: false,
                error: info
            })
        }

        if (!user) {
            return res.json({
                status: false, 
                error: info
            }); 
        }

        req.logIn(user, (error) => {
          if (error) {
               return res.status(500).json({
                    status: false,
                    error
               }); 
            }

          return res.status(202).json({
                "user": req.user,
                status: true,
                message: 'Logged in successfully'
          })

        });
      })(req, res, next);

};

module.exports.LogOut = (req, res) => {
    req.logOut();
    res.json({
        status: true,
        message: "Successfully logged out!"
    });
}

module.exports.GetUser = (req, res) => {
    res.json({
        status: true,
        user: req.user
    });
}

module.exports.IsAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({
        status: false,
        "error": "Not authorized!"
    })
}

module.exports.IsVerified = (req, res, next) => {
    if(!req.user.isVerified){
        return res.status(403).json({
            status: false, 
            error: 'Not verified'
        })
    }
    next();
}
