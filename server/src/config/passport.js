const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
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

/**
 * TODO : In Google login create wallet and user using transaction!!!!!!
 */

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.REACT_APP_BACKEND+"/login/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			console.log(profile);

			User.findOne({ googleId: profile.id })
				.then((user) => {
					if (!user) {
						
						const account = new Account();
						
						const wallet = new Wallet({
							account: account._id
						});

						const curUser = new User({
							googleId: profile.id,
							firstName: profile._json.given_name,
							lastName: profile._json.family_name,
							email: profile._json.email,
							isVerified: true,
							wallet: wallet._id,
						});



						wallet
							.save()
							.then((wallet) => {
								console.log('Wallet created!');

							})
							.catch((e) => {
								console.log(e);
							});

						account.save().then((account) => {
							console.log('Account created!');
						}).catch((e) => {
							console.log(e);
						})

						curUser
							.save()
							.then((user) => {
								done(null, user);
							})
							.catch((e) => {
								done(e, null);
							});

						return;
					}

					return done(null, user);
				})
				.catch((error) => {
					return done(error, null);
				});
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
