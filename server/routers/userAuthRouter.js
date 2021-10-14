const express = require('express');
const router = express.Router();
const {SignUp, VerifyUser, LogIn, LogOut, isAuthenticated} = require('../utility/userAuth');

router.post('/register', SignUp);
router.post('/verifyUser', VerifyUser);
router.post('/login', LogIn);
router.post('/logout', isAuthenticated, LogOut);

module.exports = router;