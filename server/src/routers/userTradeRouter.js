/**
 * Trading related routers
 */

const express = require('express');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { DailyPortfolio, Sell, Buy, GetActiveOrders, GetOrders, OverallPortfolio} = require('../middlewares/userTrade');
const { PopulateWallet } = require('../middlewares/userWallet');
const router = express.Router();

router.get('/getDailyPortfolio', IsAuthenticated, IsVerified, PopulateWallet, DailyPortfolio);
router.get('/getOverallPortfolio', IsAuthenticated, IsVerified, PopulateWallet, OverallPortfolio);
router.post('/sell', IsAuthenticated, IsVerified, Sell);
router.post('/buy', IsAuthenticated, IsVerified, Buy);
router.get('/getActiveOrders', IsAuthenticated, IsVerified, PopulateWallet, GetActiveOrders);
router.get('/getOrders', IsAuthenticated, IsVerified, PopulateWallet, GetOrders);

module.exports = router;