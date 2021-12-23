/**
 * Middlewares related to Trading 
 * 
 * Author: Alok Kumar Singh
 */

const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
const {getCurrentPrice} = require('../utils/priceStats');
const {getPercentChange} = require('../utils/priceStats');
const {createAndAddOrder} = require('../utils/trade');
const {addSocketId} = require('../store/SocketMap');

const {getActiveOrders, getOrders} = require('../utils/orders');

module.exports.GetActiveOrders = async (req, res) => {
    try{
        const activeOrders = await getActiveOrders(req.wallet);
        return res.json({
            status: true,
            activeOrders
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
}

module.exports.GetOrders = async (req , res) => {
    try{
        const orders = await getOrders(req.wallet);
        return res.json({
            status: true,
            orders
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }

}

/**
 * TODO: Remove socket Id
 * TODO: Test socket update functionality
 */

module.exports.Sell = async (req, res) => {
    const user = req.user;
    const {price, quantity, coinType} = req.body;
    const { socketId } = req.session;
    addSocketId(user._id, socketId);
    // console.log(req.session);
    console.log('socketId in sell: ', socketId);

    try{
        const orderId = await createAndAddOrder(user._id, coinType, price, quantity, 'sell');
        
        return res.json({
            status: true,
            orderId
        });
    }
    catch(e){
        console.log('error:', e);

        return res.status(500).json({
            status: false,
            error: e.message
        });
    }
}

module.exports.Buy = async (req, res) => {
    const user = req.user;
    const {price, quantity, coinType} = req.body;
    const { socketId } = req.session;
    addSocketId(user._id, socketId);
    
    try{
        const orderId = await createAndAddOrder(user._id, coinType, price, quantity, 'buy');

        return res.json({
            status: true,
            orderId
        });
    }
    catch(e){

        console.log('error:', e);
        return res.status(500).json({
            status: false,
            error: e.message
        });
    }
}

/**
 * TODO: Remove transaction
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
    const wallet = req.wallet;

    try{
        if(!wallet){
            return res.json({
                status: false,
                error: 'Wallet not found!'
            });
        }

        await wallet.populate({
            path: 'coins',
            select: ['coinType', 'costPrice', 'sellPrice', 'quantity']
        });

        console.log(wallet);

        const portfolio = {
            coins: [],
            totalPercentGrowth: 0, 
            totalCostPrice: 0, 
            totalSellPrice: 0
        };

        /*
                /getPortfolio : 
                Cost Price , 
                Sell Price , 
                Current Value, 
                Growth%( ye us coin k growth hi kr dena )
        */

        for (var i = 0; i < wallet.coins.length; i++){
            
            const coin = wallet.coins[i];
            const obj = {};
            obj.costPrice = parseFloat(coin.costPrice);
            obj.sellPrice = parseFloat(coin.sellPrice);
            obj.quantity = parseFloat(coin.quantity);
            obj.coinType = coin.coinType;

            const {priceChange} = await getPercentChange(coin.coinType);
            const costPricePerCoin = parseFloat(coin.costPrice)/parseFloat(coin.quantity);
            obj.percentGrowth = priceChange/costPricePerCoin * 100;
            portfolio.coins.push(obj);

            portfolio.totalPercentGrowth = portfolio.totalPercentGrowth + obj.percentGrowth;
            portfolio.totalCostPrice = portfolio.totalCostPrice + parseFloat(coin.costPrice);
            portfolio.totalSellPrice = portfolio.totalSellPrice + parseFloat(coin.sellPrice);
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