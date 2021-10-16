const express = require('express');
const controller = require('../Controller/controller')
const router = express.Router();


router.get('/fetchHistory', controller.fetchHistory);
router.get('/fetchMarketChartRange', controller.fetchMarketchartRange);

module.exports = router;