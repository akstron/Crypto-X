/**
 * Trading related routers
 */

const express = require('express');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { DailyPortfolio, Transaction, Sell, Buy} = require('../middlewares/userTrade');
const router = express.Router();

/**
 * transaction router to be removed!
 */

router.put('/transaction', IsAuthenticated, IsVerified, Transaction);
router.get('/portfolio', IsAuthenticated, IsVerified, DailyPortfolio);
router.post('/sell', IsAuthenticated, IsVerified, Sell);
router.post('/buy', IsAuthenticated, IsVerified, Buy);

module.exports = router;