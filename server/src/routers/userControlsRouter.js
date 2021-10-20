/**
 * Router of functions available to user
 */

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { EditUser } = require('../middlewares/userControls'); 
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { validationHandler } = require('../middlewares/validationHandler');

router.post('/edit', IsAuthenticated, IsVerified, 
    body('password').optional()
    .isLength({min: 7}).withMessage('Provide password of atleast length 7')
    /* Regex for checking password*/
    .matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/)
    .withMessage('Password should contain letter, number and special character'),
    validationHandler,
EditUser);

/**
 * FOR: testing
 */

router.get('/check', (req, res) => {
    res.json({
        data: [
            {
                Id:1,
                ImgURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",
                CoinTitle:'bitcoin',
                CoinName:'Bitcoin',
                CoinDetails:'A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.',
                CoinPrice:25701.50,
                CoinGrowth_24:0.51,
            },
            {
                Id:2,
                ImgURL :"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",
                CoinTitle:'Ethereum',
                CoinName:'ethereum',
                coinDetails:'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.',
                CoinPrice:25701.50,
                CoinGrowth_24:-0.21,
            },
            {
                Id:3,
                ImgURL :"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",
                CoinTitle:'Dogecoin',
                CoinName:'digecoin',
                CoinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',
                CoinPrice:25701.50,
                CoinGrowth_24:0.1,
            },
        ]
    });
})


module.exports = router;