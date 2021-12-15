/**
 * Trade related methods
 * 
 * Author: Alok Kumar Singh
 */

const {sellOrders, buyOrders} = require('../store/OrderMap');
const LinkedList = require('../store/LInkedList');
const mongoose = require('mongoose');
const Order = require('../models/Order');

const createOrder = (usedId, coinType, price, quantity, orderType) => {

    /* Creating order*/
    const currentOrder = {
        usedId,
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

/* Add order to linked list */
const addOrder = async (order, orderMap) => {

    const {coinType, price} = order;

    if(!orderMap.has(coinType)) orderMap.set(coinType, new Map());
    const coinMap = orderMap.get(coinType); 
    
    if(!coinMap.has(price)) coinMap.set(price, new LinkedList());
    
    const orderList = coinMap.get(price);
    orderList.pushBack(order);

    const dbOrder = new Order(order);
    await dbOrder.save();

    return orderList;
}

/* Utility function for getting minimum value */
const getMinimum = (first, second) => {
    return (first < second ? first : second);
}

const updateOrderInDatabase = async (order, orderType) => {
    const { _id } = order;

    /* Update this somewhere else */
    order.orderType = orderType;

    await Order.findByIdAndUpdate(_id, order);
}

/**
 * TODO: 
 * 1. Add socket, for updating
 * 2. Update balance and coins
 */

const orderUpdate = async (order, orderType) => {

    await updateOrderInDatabase(order, orderType);

    console.log(orderType);
    console.log(order);
}

/* To perform match and commit orders */
const performMatch = async (buyList, sellList) => {
    if(buyList.isEmpty() || sellList.isEmpty()) 
    {
        console.log('Empty');
        return;
    }

    // console.log('Matching...\n');

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

        await orderUpdate(sellOrder, 'sell');
        await orderUpdate(buyOrder, 'buy');

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
    const orderList = addOrder(order, buyOrders);

    await findMatchAndUpdate(coinType, price);
}

module.exports = {
    addSellOrder, 
    addBuyOrder
};
