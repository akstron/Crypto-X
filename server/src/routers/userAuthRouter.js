/**
 * Router for authentication related work for user
 */

const express = require('express');
const passport = require('passport');
const {body} = require('express-validator');
const router = express.Router();
const {SignUp, VerifyUser, LogIn, LogOut, IsAuthenticated, GetUser, IsVerified} = require('../middlewares/userAuth');
const {validationHandler} = require('../middlewares/validationHandler');
const {AddPancard} = require('../middlewares/userControls');

router.post('/signup', 
[
    body(['email', 'password']).notEmpty().withMessage('Incomplete data'),
    body('email').isEmail().withMessage('Provide valid email'),
    body('password').isLength({min: 7}).withMessage('Provide password of atleast length 7')
    /* Regex for checking password*/
    .matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/)
    .withMessage('Password should contain letter, number and special character')
],
validationHandler,
SignUp);
router.post('/verifyUser', VerifyUser);
router.post('/login', LogIn);
router.post('/logout', IsAuthenticated, LogOut);
router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/getUser', IsAuthenticated, GetUser);
router.get('/login/google/callback', passport.authenticate('google', {failureRedirect: process.env.REACT_APP_FRONTEND+'/login'}), (req, res) => {
    res.redirect(process.env.REACT_APP_FRONTEND);
});
router.post('/addPancard', IsAuthenticated, IsVerified, AddPancard);


module.exports = router;