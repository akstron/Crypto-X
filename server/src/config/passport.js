const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

passport.use(
    /* Default fields are 'username' and 'password' */

    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Wrong email or password.' });
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

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });