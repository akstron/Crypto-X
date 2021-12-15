/**
 * Middlewares related to Trading 
 */

const {v4: idGererator} = require('uuid');
const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
const Bank = require('../models/Bank');
const {getCurrentPrice} = require('../utils/priceStats');
const {getPercentChange} = require('../utils/priceStats');


const updateBank = (coins, updates) => {
    for(const [key, value] of Object.entries(updates)){
        if(key in coins){
            coins[key] += value * -1;
        } 
        else {
            coins[key] = value * -1;
        }
    }
}

const addTransaction = (coins, updates, rate) => {
    for(const [key, value] of Object.entries(updates)){
        if(key in coins){
            coins[key].push({
                id: idGererator(), 
                coins: value,
                rate
            });
        }
        else{
           coins[key] = [{
                id: idGererator(),
                coins: value,
                rate
           }];
        }
    }
}

module.exports.Sell = async (req, res) => {
    const user = req.user;
    const {price, quantity, coinType} = req.body;

}

/**
 * TODO: Remove transaction
 */

/**
 * TODO: Add checks whether account reaches below zero
 */

module.exports.Transaction = async (req, res) => {
    const user = req.user;
    const {updates} = req.body;
    const session = await mongoose.startSession();

    console.log(user);
    console.log(updates);

    try{
        session.startTransaction();

        const wallet = await Wallet.findById(user.wallet).session(session);
        var bank = await Bank.findOne({}).session(session);

        if(!bank){
            bank = new Bank({}, session);
            await bank.save();
        }

        /**
         * TODO: change this to act according to symbol
         */
        const rate = await getCurrentPrice('bitcoin');

        addTransaction(wallet.coins, updates, rate);
        updateBank(bank, updates);

        wallet.markModified('coins');

        await wallet.save();
        await bank.save();

        await session.commitTransaction();
        session.endSession();

        res.json({
            wallet
        });

    } catch(e){

        await session.abortTransaction();
        session.endSession();
        console.log(e);
        res.json({
            status: false,
            error: 'Internal server error'
        })
    }
}

module.exports.DailyPortfolio = async (req, res) => {
    const user = req.user;

    try{
        const wallet = await Wallet.findById(user.wallet);
        if(!wallet){
            return res.json({
                status: false,
                error: 'Wallet not found!'
            });
        }

        const coins = wallet.coins;
        const portfolio = {};

        for(const [coinSymbol, value] of Object.entries(coins)){
            const {priceChange, priceChangePercentage} = await getPercentChange(coinSymbol);
            portfolio[coinSymbol] = {};

            portfolio[coinSymbol].priceChangePercentage = priceChangePercentage;
            portfolio[coinSymbol].priceChange = priceChange;
            portfolio[coinSymbol].numberOfCoins = value;
            portfolio[coinSymbol].profit = value * priceChange;
        }

        return res.json({
            portfolio
        });
    }
    catch(e){

        console.log('error:', e);
        return res.status(500).json({
            status: false,
            error: 'Interval server error'
        });
    }
}