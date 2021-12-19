/**
 * Router for account related work for user
 */
 
const express = require('express');
const router = express.Router();
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { PopulateWallet, GetWallet } = require('../middlewares/userWallet');

router.get('/getWallet', IsAuthenticated, IsVerified, PopulateWallet, GetWallet);

module.exports = router;