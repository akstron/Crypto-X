const express = require('express');
const controller = require('../Controller/controller')
const {getCoinDetails} = require('../middlewares/coinDetails')
const {getCryptoNews} = require('../middlewares/coinNews')
const router = express.Router();


router.get('/fetchHistory', controller.fetchHistory);
router.get('/fetchMarketChartRange', controller.fetchMarketchartRange);
router.post('getCoinDetails', getCoinDetails)
router.post('getCryptoNews', getCryptoNews);

module.exports = router;