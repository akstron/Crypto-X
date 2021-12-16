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
const io = require('../server');
const { socketList } = require('./clientSockets');

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

    console.log(currentOrder);

    return currentOrder;
}

/* While placing an order remove required amount of money or coins from wallet beforehand */
const addOrderInDatabase = async (order) => {
    const dbOrder = new Order(order);

    const user = await User.findById(order.usedId);
    if(!user){
        throw new Error('No user found!!');
    }

    const wallet = await Wallet.findById(user.wallet);
    if(!wallet){
        throw new Error('No wallet found!');
    }

    if(order.orderType === 'buy'){
    
        const totalMoneySpent = order.price * order.quantity;
        if(totalMoneySpent > wallet.balance){
            throw new Error('Insufficient amount in wallet');
        }

        wallet.balance -= totalMoneySpent;
 
    }
    else {
        if(!(order.coinType in wallet.coins)){
            throw new Error('Insufficient coins in wallet');
        }

        if(wallet.coins[order.coinType] < order.quantity){
            throw new Error('Insufficient coins in wallet');
        }

        wallet.coins[order.coinType] -= order.quantity;
        wallet.markModified('coins');

        console.log(wallet.coins);
    }

    await wallet.save();
    await dbOrder.save();   
}

/* Add order to linked list */
const addOrder = async (order, orderMap) => {

    const {coinType, price} = order;

    if(!orderMap.has(coinType)) orderMap.set(coinType, new Map());
    const coinMap = orderMap.get(coinType); 
    
    if(!coinMap.has(price)) coinMap.set(price, new LinkedList());
    
    const orderList = coinMap.get(price);
    orderList.pushBack(order);

    await addOrderInDatabase(order);

    return orderList;
}

/* Utility function for getting minimum value */
const getMinimum = (first, second) => {
    return (first < second ? first : second);
}

const updateWallet = async (order, exchange) => {
    const user = await User.findById(order.usedId);
    if(!user){
        throw new Error('No user found!!');
    }

    const wallet = await Wallet.findById(user.wallet);
    if(!wallet){
        throw new Error('No wallet found!');
    }

    if(order.orderType === 'buy'){
        if(!(order.coinType in wallet.coins)){
            wallet.coins[order.coinType] = 0;
        }

        wallet.coins[order.coinType] += order.exchange;
        wallet.markModified('coins');
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

    if(order.orderType === 'sell'){
        await updateWallet(order, exchange);
    }
}

/**
 * TODO: 
 * 1. Add socket, for updating
 */

const orderUpdate = async (order, exchange) => {

    await updateOrderInDatabase(order, exchange);

<<<<<<< HEAD
    await sendOrderStatus(order);

    console.log(order);
=======
>>>>>>> c2fddb3cc6a623391b74c78a83ec1f6034663090
}

/* To perform match and commit orders */
const performMatch = async (buyList, sellList) => {
    if(buyList.isEmpty() || sellList.isEmpty()) 
    {
        console.log('Empty');
        return;
    }

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

    // console.log('Matching started\n');

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

const addSellOrder = async (userId, coinType, price, quantity) => {
    if(!userId || !coinType || !price || !quantity){
        throw new Error('Null values not accepted!');
    }

    price = parseInt(price);
    quantity = parseInt(quantity);

    /* Create order */
    const order = createOrder(userId, coinType, price, quantity, 'sell');   
    const orderList = await addOrder(order, sellOrders);

    await findMatchAndUpdate(coinType, price);
}

const addBuyOrder = async (userId, coinType, price, quantity) => {
    if(!userId || !coinType || !price || !quantity){
        throw new Error('Null values not accepted!');
    }

    price = parseInt(price);
    quantity = parseInt(quantity);

    /* Create order */
    const order = createOrder(userId, coinType, price, quantity, 'buy');   
    const orderList = await addOrder(order, buyOrders);

    await findMatchAndUpdate(coinType, price);
}

const sendOrderStatus = async (order) => {
    if(socketList.has(order.userId)){
        const socketId = socketList.get(userId).id;
        io.to(socketId).emit('orderStatus', order);
    }else{
        console.log(order.userId + " " + 'does not exist');
    }
}

module.exports = {
    addSellOrder, 
    addBuyOrder
};
