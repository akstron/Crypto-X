/**
 * Trading related routers
 */

const express = require('express');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { DailyPortfolio, Transaction } = require('../middlewares/userTrade');
const router = express.Router();


router.put('/transaction', IsAuthenticated, IsVerified, Transaction);
router.get('/portfolio', IsAuthenticated, IsVerified, DailyPortfolio);

module.exports = router;