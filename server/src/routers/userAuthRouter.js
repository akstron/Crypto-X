/**
 * Router for authentication related work for user
 */

const express = require('express');
const router = express.Router();
const {SignUp, VerifyUser, LogIn, LogOut, IsAuthenticated, IsVerified} = require('../utility/userAuth');

router.post('/signup', SignUp);
router.post('/verifyUser', VerifyUser);
router.post('/login', LogIn);
router.post('/logout', IsAuthenticated, LogOut);

module.exports = router;