/**
 * Trade related methods
 * 
 * Author: Alok Kumar Singh
 */

const {sellOrders, buyOrders} = require('../store/OrderMap');
const LinkedList = require('../store/LInkedList');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const { getSocketId } = require('../store/SocketMap'); 
const Coin = require('../models/Coin');

const createOrder = (userId, coinType, price, quantity, orderType) => {

    /* Creating order*/
    const currentOrder = {
        userId,
        _id: mongoose.Types.ObjectId(), 
        coinType,
        price,
        quantity,
        completed: 0,
        orderType
    };

    // console.log(currentOrder);

    return currentOrder;
}

const getCoinFromWallet = (coinType, wallet) => {

    var coin = null;
    wallet.coins.forEach((currentCoin) => {
        if(currentCoin.coinType === coinType) coin = currentCoin;
    });

    return coin;
}

/* While placing an order remove required amount of money or coins from wallet beforehand */
const addOrderInDatabase = async (order) => {
    const dbOrder = new Order(order);

    const user = await User.findById(order.userId);
    if(!user){
        throw new Error('No user found!!');
    }

    const wallet = await Wallet.findById(user.wallet);
    if(!wallet){
        throw new Error('No wallet found!');
    }

    if(order.orderType === 'buy'){

        /**
         * TODO : change status code according to this
         */
    
        const totalMoneySpent = order.price * order.quantity;
        if(totalMoneySpent > wallet.balance){
            throw new Error('Insufficient amount in wallet');
        }

        wallet.balance -= totalMoneySpent;
    }
    else {
        /**
         * Change this
         */

        await wallet.populate({
            path: 'coins',
            select: ['coinType', 'quantity', 'costPrice', 'sellPrice']
        });

        console.log(wallet);

        const coin = getCoinFromWallet(order.coinType, wallet);

        if(!coin){
            throw new Error('Insufficient coins in wallet!!');
        }

        if(coin.quantity < order.quantity){
            throw new Error('Insufficient coins in wallet');
        }

        if(coin.quantity !== 0)coin.costPrice = (coin.quantity - order.quantity) * coin.costPrice/coin.quantity;
        coin.quantity -= order.quantity;
        coin.sellPrice += order.quantity * order.price;

        await coin.save();
    }
    
    wallet.orders.push(dbOrder._id);
    await wallet.save();
    await dbOrder.save();   
}

/* Add order to linked list */
const addOrder = async (order, orderMap, session) => {

    const {coinType, price} = order;

    if(!orderMap.has(coinType)) orderMap.set(coinType, new Map());
    const coinMap = orderMap.get(coinType); 
    
    if(!coinMap.has(price)) coinMap.set(price, new LinkedList());
    
    const orderList = coinMap.get(price);
    orderList.pushBack(order);

    await addOrderInDatabase(order, session);

    return orderList;
}

/* Utility function for getting minimum value */
const getMinimum = (first, second) => {
    return (first < second ? first : second);
}

const updateWallet = async (order, exchange) => {
    const user = await User.findById(order.userId);
    if(!user){
        throw new Error('No user found!!');
    }

    const wallet = await Wallet.findById(user.wallet);
    if(!wallet){
        throw new Error('No wallet found!');
    }

    await wallet.populate({
        path: 'coins',
        select: ['coinType', 'quantity', 'costPrice', 'sellPrice']
    });

    var coin = getCoinFromWallet(order.coinType, wallet);

    if(!coin){
        coin = new Coin({
            walletId: wallet._id,
            coinType: order.coinType,
        });

        wallet.coins.push(coin._id);
    }

    if(order.orderType === 'buy'){

        coin.quantity += exchange;

        /* Update investment */
        coin.costPrice += exchange * order.price;

        await coin.save();
    }
    else {
        wallet.balance += exchange * order.price;
    }

    await wallet.save();
}

/**
 * TODO: Don't use this update function frequently
 * Make a bulk update
 */
const updateOrderInDatabase = async (order, exchange) => {
    const { _id } = order;

    await Order.findByIdAndUpdate(_id, order);
    await updateWallet(order, exchange);
}

// Send order completions updates from here to client using socket

const sendOrderNotification = async (order) => {
    const io = require('../server');
    const socketId = getSocketId(order.userId);

    /**
     * TODO!!!!!!!!!!!!!!!!
     * CHECK WHY IO IS THROWING ERROR AGAIN AND AGAIN
     * COMMENTING IT AT PRESENT
     */

    /* If no socket is found, function would throw error */
    io.to(socketId).emit('sendOrderNotification', order);
    console.log(io);
}

const orderUpdate = async (order, exchange) => {

    console.log('Updating order...');
    await updateOrderInDatabase(order, exchange);
    await sendOrderNotification(order);
}

/* To perform match and commit orders */
const performMatch = async (buyList, sellList) => {
    if(buyList.isEmpty() || sellList.isEmpty()) 
    {
        console.log('Empty');
        return;
    }

    console.log('Matching...');

    var currentBuyer = buyList.head;
    var currentSeller = sellList.head;

    while(currentBuyer && currentSeller){

        const buyOrder = currentBuyer.order;
        const sellOrder = currentSeller.order;

        var remainingBuyOrder = buyOrder.quantity - buyOrder.completed;
        var remainingSellOrder = sellOrder.quantity - sellOrder.completed;

        const minimumExchange = getMinimum(remainingBuyOrder, remainingSellOrder);
        
        buyOrder.completed += minimumExchange;
        sellOrder.completed += minimumExchange;

        remainingBuyOrder = buyOrder.quantity - buyOrder.completed;
        remainingSellOrder = sellOrder.quantity - sellOrder.completed;

        await orderUpdate(sellOrder, minimumExchange);
        await orderUpdate(buyOrder, minimumExchange);

        /**
         * TODO: Put commited deal in database
         * 
         * First put commited deal in a linked list and then at intervals put
         * bulk of these commits in db
         */

        if(remainingSellOrder === 0){
            sellList.popFront();
            currentSeller = sellList.head;
        }

        if(remainingBuyOrder === 0){
            buyList.popFront();
            currentBuyer = buyList.head;
        }
    }
}

/* Method for finding match for buy and sell orders and committing deals */

/**
 * TODO: Make this asynchronours (MAYBE)
 */

const findMatchAndUpdate = async (coinType, price) => {
    if(!coinType || !price){
        throw new Error("Can't find match for null type");
    }

    console.log('Matching started\n');

    if(!buyOrders.has(coinType)) return;
    if(!sellOrders.has(coinType)) return;

    const buyMap = buyOrders.get(coinType);
    const sellMap = sellOrders.get(coinType);

    if(!buyMap.has(price)) return;
    if(!sellMap.has(price)) return;

    const buyList = buyMap.get(price);
    const sellList = sellMap.get(price);

    await performMatch(buyList, sellList);
}

const createAndAddOrder = async (userId, coinType, price, quantity, orderType) => {
    if(!userId || !coinType || !price || !quantity || !orderType){
        throw new Error('Null values not accepted!');
    }

    price = parseInt(price);
    quantity = parseInt(quantity);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        /* Create order */
        const order = createOrder(userId, coinType, price, quantity, orderType);   
        const orderList = await addOrder(order, (orderType === 'sell' ? sellOrders : buyOrders), session);

        await findMatchAndUpdate(coinType, price);
        return order._id;
    }
    catch(e){
        await session.abortTransaction();
        session.endSession();
        console.log(e);

        throw new Error(e.message);
    }
}


module.exports = {
    createAndAddOrder
};
