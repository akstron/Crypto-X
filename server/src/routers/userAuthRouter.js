/**
 * Router for authentication related work for user
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const {SignUp, VerifyUser, LogIn, LogOut, IsAuthenticated, IsVerified, GetUser} = require('../utility/userAuth');

router.post('/signup', SignUp);
router.post('/verifyUser', VerifyUser);
router.post('/login', LogIn);
router.post('/logout', IsAuthenticated, LogOut);
router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/getUser', IsAuthenticated, GetUser);
// router.get('/loggedIn', passport.authenticate('google', {failureRedirect: '/login'}), 
// (req, res) => {
//     console.log(req.body);
//     res.json({
//         status: true, 
//         message: 'Logged in successfully'
//     });
// });

module.exports = router;