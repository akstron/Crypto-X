const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Account = require('../models/Account');

/**
 * LocalStrategy: Signup and login using email and password
 */
passport.use(
	/* Default fields are 'username' and 'password' */
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		User.findByEmail(email)
			.then((user) => {
				if (!user) {
					return done(null, false, { message: "Wrong email or password" });
				}

				bcrypt.compare(password, user.password, (error, isMatch) => {
					if (error) {
						return done(error, false, null);
					}
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: "Wrong email or password" });
					}
				});
			})
			.catch((error) => {
				console.log(error);
				return done(null, false, { error });
			});
	})
);

/**
 * GoogleStrategy: Login using google account
 */
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.REACT_APP_BACKEND+"/login/google/callback",
		},
		async function (accessToken, refreshToken, profile, done) {
			console.log(profile);

			const session = await mongoose.startSession();

			try{
				/* Start transaction */
				session.startTransaction();

				const googleId = profile.id;
				var user = await User.findOne({googleId});

				if(!user){
					const accountArray = await Account.create([{}], {session});
					const account = accountArray[0];

					const walletArray = await Wallet.create([{
						account: account._id
					}], {session});

					const wallet = walletArray[0];

					const userArray = await User.create([{
						googleId: profile.id,
						firstName: profile._json.given_name,
						lastName: profile._json.family_name,
						email: profile._json.email,
						isVerified: true,
						wallet: wallet._id,
					}], {session});

					user = userArray[0];
				}

				await session.commitTransaction();
				session.endSession();

				return done(null, user);
			}
			catch(e){
				console.log(e);
				await session.abortTransaction();
				session.endSession();
				done(e, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (error, user) => {
		done(error, user);
	});
});