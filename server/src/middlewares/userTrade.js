/**
 * Middlewares related to Trading 
 */

const {getPercentChange} = require('../utils/priceStats');
const {createAndAddOrder} = require('../utils/trade');
const {addSocketId} = require('../store/SocketMap');
const {getCurrentPrice} = require('../utils/currentPrice');

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

        return res.status(e.statusCode || 500).json({
            status: false,
            error: e.msg || 'Intenal server error!'
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

        console.log('error:', e.msg);

        return res.status(e.statusCode || 500).json({
            status: false,
            error: e.msg || 'Intenal server error!'
        });
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

        const portfolio = {
            coins: [],
            totalPercentGrowth: 0, 
            totalCostPrice: 0, 
            totalSellPrice: 0
        };

        for (var i = 0; i < wallet.coins.length; i++){
            
            const coin = wallet.coins[i];
            const obj = {};
            obj.costPrice = parseFloat(coin.costPrice);
            obj.sellPrice = parseFloat(coin.sellPrice);
            obj.quantity = parseFloat(coin.quantity);
            obj.coinType = coin.coinType;

            const {priceChangePercentage} = await getPercentChange(coin.coinType);
            obj.percentGrowth = priceChangePercentage;
            portfolio.coins.push(obj);

            portfolio.totalPercentGrowth = portfolio.totalPercentGrowth + parseFloat(obj.percentGrowth);
            portfolio.totalCostPrice = portfolio.totalCostPrice + parseFloat(coin.costPrice);
            portfolio.totalSellPrice = portfolio.totalSellPrice + parseFloat(coin.sellPrice);
        }

        console.log(portfolio);

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

module.exports.OverallPortfolio = async (req, res) => {
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

        const portfolio = {
            coins: [],
            totalPercentGrowth: 0, 
            totalCostPrice: 0, 
            totalSellPrice: 0
        };

        for (var i = 0; i < wallet.coins.length; i++){
            
            const coin = wallet.coins[i];
            const obj = {};
            obj.costPrice = parseFloat(coin.costPrice);
            obj.sellPrice = parseFloat(coin.sellPrice);
            obj.quantity = parseFloat(coin.quantity);
            obj.coinType = coin.coinType;

            const currentSellPrice = await getCurrentPrice(obj.coinType);
            obj.percentGrowth = (parseFloat(currentSellPrice) - obj.costPrice)/obj.costPrice * 100;
            portfolio.coins.push(obj);

            portfolio.totalPercentGrowth = portfolio.totalPercentGrowth + parseFloat(obj.percentGrowth);
            portfolio.totalCostPrice = portfolio.totalCostPrice + parseFloat(coin.costPrice);
            portfolio.totalSellPrice = portfolio.totalSellPrice + parseFloat(coin.sellPrice);
        }

        return res.json({
            portfolio
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            status: false, 
            error: 'Internal server error'
        });
    }
}