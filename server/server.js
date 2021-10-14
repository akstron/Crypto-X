require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();

require('./config/passport');
require('./config/connection');
const userAuthRouter = require('./routers/userAuthRouter');

const sessionStore = require('connect-mongo').create({
    mongoUrl: process.env.MONGO_DB_URI
});

app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true, 
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
    })
);

/**
 * TODO: Setting up cors
 */

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(userAuthRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});