const express = require('express');
const paymentGateway = require('../middlewares/paymentGateway');
const router = express.Router();


router.post('/payment', paymentGateway.payment);

module.exports = router;