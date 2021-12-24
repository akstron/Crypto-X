const express = require('express');
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const {subscribe} = require('../utils/pushNotificationSubscription')
const {storeNotification} = require('../utils/storePushNotification')
const router = express.Router();

router.post('/subscribe', IsAuthenticated, IsVerified, subscribe);
router.post('/storeNotification', IsAuthenticated, IsVerified, storeNotification);
module.exports = router;