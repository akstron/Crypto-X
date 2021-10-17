const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

passport.use(

  /* Default fields are 'username' and 'password' */
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    
    User.findByEmail(email).then(user => {
      if (!user) {
        return done(null, false, { message: 'Wrong email or password.fsdf' });
      }

      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw error;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Wrong email or password' });
        }
      });

    }).catch(error => {
      console.log(error);
      return done(null, false, {error})
    });

  })
);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000"
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({googleId: profile.id}).then((user) => {
      if(!user){
        const wallet = new Wallet({
           coins: {
             bitcoin: []
           }
        });

        const curUser = new User({
          googleId: profile.id,
          email: profile._json.email,
          isVerified: true,
          wallet: wallet._id
        });

        wallet.save().then((wallet) => {

        }).catch(e => {
          console.log(e);
        });
      
        curUser.save().then((user) => {
            done(null, user);
        }).catch(e => {
            done(e, null);
        });

        return;
      }

      return done(null, user);

    }).catch(error => {
       return done(error, null);
    })
}
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user);
  });
});