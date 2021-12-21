const express = require('express');
const paymentGateway = require('../middlewares/paymentGateway');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const router = express.Router();

router.post('/createOrder', paymentGateway.createOrder);
router.post('/verification', IsAuthenticated, IsVerified, paymentGateway.verification);
router.post('/createContact', IsAuthenticated, IsVerified, paymentGateway.contact);
router.post('/createFundAccountUsingBankAccount', IsAuthenticated, IsVerified, paymentGateway.fundAccountUsingBankAccount);
router.post('/createFundAccountUsingVPA', IsAuthenticated, IsVerified, paymentGateway.fundAccountUsingVPA);
router.post('/payout', IsAuthenticated, IsVerified, paymentGateway.payout);

module.exports = router;