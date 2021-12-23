const express = require('express');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { PopulateWallet, PopulateAccount } = require('../middlewares/userWallet');
const {CreateOrder, Verification, Contact, AddAccount, FundAccountUsingBankAccount, AddUPI, FundAccountUsingVPA, Payout} = require('../middlewares/paymentGateway');
const router = express.Router();

router.post('/createOrder', IsAuthenticated, IsVerified, PopulateWallet, CreateOrder);
router.post('/verification', Verification);
router.post('/addAccount', IsAuthenticated, IsVerified, PopulateAccount, AddAccount)
router.post('/addUPI', IsAuthenticated, IsVerified, PopulateAccount, AddUPI);
router.post('/payout', IsAuthenticated, IsVerified, PopulateWallet, PopulateAccount, Payout);

module.exports = router;