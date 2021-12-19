/**
 * Trading related routers
 */

const express = require('express');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { DailyPortfolio, Transaction, Sell, Buy, GetActiveOrders, GetOrders} = require('../middlewares/userTrade');
const { PopulateWallet } = require('../middlewares/userWallet');
const router = express.Router();

/**
 * transaction router to be removed!
 */

router.put('/transaction', IsAuthenticated, IsVerified, Transaction);
router.get('/portfolio', IsAuthenticated, IsVerified, DailyPortfolio);
router.post('/sell', IsAuthenticated, IsVerified, Sell);
router.post('/buy', IsAuthenticated, IsVerified, Buy);
router.get('/getActiveOrders', IsAuthenticated, IsVerified, PopulateWallet, GetActiveOrders);
router.get('/getOrders', IsAuthenticated, IsVerified, PopulateWallet, GetOrders);

module.exports = router;