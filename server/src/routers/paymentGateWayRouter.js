const express = require('express');
const paymentGateway = require('../middlewares/paymentGateway');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { PopulateWallet, PopulateAccount } = require('../middlewares/userWallet');
const {CreateOrder, Verification, Contact, AddAccount, FundAccountUsingBankAccount, AddUPI, FundAccountUsingVPA, Payout} = require('../middlewares/paymentGateway');
const router = express.Router();

router.post('/createOrder', IsAuthenticated, IsVerified, CreateOrder);
router.post('/verification', IsAuthenticated, IsVerified, PopulateWallet, Verification);
router.post('/createContact', IsAuthenticated, IsVerified, PopulateAccount, Contact);
router.post('/addAccount', IsAuthenticated, IsVerified, PopulateAccount, AddAccount)
router.post('/createFundAccountUsingBankAccount', IsAuthenticated, IsVerified, PopulateAccount, FundAccountUsingBankAccount);
router.post('/addUPI', IsAuthenticated, IsVerified, PopulateAccount, AddUPI);
router.post('/createFundAccountUsingVPA', IsAuthenticated, IsVerified, PopulateAccount, FundAccountUsingVPA);
router.post('/payout', IsAuthenticated, IsVerified, PopulateWallet, Payout);

module.exports = router;