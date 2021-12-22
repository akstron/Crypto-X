const express = require('express');
const pushNotification = require('../utils/pushNotificationSubscription')
const storePushNotification = require('../utils/storePushNotification')
const router = express.Router();

router.post('/subscribe', pushNotification.subscribe);
router.post('/storeNotification',storePushNotification.storeNotification);
module.exports = router;