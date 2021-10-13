const express = require('express');
const router = express.Router();
const {SignUp, VerifyUser} = require('../utility/userAuth');

router.post('/register', SignUp);
router.post('/verifyUser', VerifyUser);

module.exports = router;