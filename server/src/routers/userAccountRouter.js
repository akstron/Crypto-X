/**
 * Router for account related work for user
 */
 
const express = require('express');
const router = express.Router();
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { PopulateWallet, GetWallet, PopulateAccount, GetAccount } = require('../middlewares/userWallet');
const Coin = require('../models/Coin');

router.get('/getWallet', IsAuthenticated, IsVerified, PopulateWallet, GetWallet);
router.get('/getBankingOptions', IsAuthenticated, IsVerified, PopulateAccount, GetAccount);

/**
 * FOR TESTING ONLY
 */

const getCoinFromWallet = (coinType, wallet) => {

    var coin = null;
    wallet.coins.forEach((currentCoin) => {
        if(currentCoin.coinType === coinType) coin = currentCoin;
    });

    return coin;
}

router.post('/addCoins', IsAuthenticated, IsVerified, PopulateWallet, async (req, res) => {
    var {coinType, quantity, sellPrice, costPrice} = req.body;

    quantity = parseInt(quantity);
    sellPrice = parseInt(sellPrice);
    costPrice = parseInt(costPrice);

    const wallet = req.wallet;

    try{
        await wallet.populate({
            path: 'coins',
            select: ['coinType', 'quantity', 'costPrice', 'sellPrice']
        });

        var coin = getCoinFromWallet(coinType, wallet);
        if(!coin){
            coin = new Coin({
                coinType, 
                quantity: 0, 
                sellPrice: 0, 
                costPrice: 0
            });

            await coin.save();

            wallet.coins.push(coin._id);

            await wallet.save();

            await wallet.populate({
                path: 'coins',
                select: ['coinType', 'quantity', 'costPrice', 'sellPrice']
            });
        }

        coin.quantity += quantity;
        coin.sellPrice = parseFloat(coin.sellPrice) + sellPrice;
        coin.costPrice = parseFloat(coin.costPrice) + costPrice;
        await coin.save();

        res.json({
            status: true,
            message: 'Coins added to wallet'
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            status: false,
            error: e.message 
        });
    }
});

module.exports = router;