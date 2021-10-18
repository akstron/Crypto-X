const express = require('express');
const paymentGateway = require('../middlewares/paymentGateway');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const router = express.Router();

router.post('/payment', IsAuthenticated, IsVerified, paymentGateway.payment);

module.exports = router;