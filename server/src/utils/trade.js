/**
 * Trade related methods
 * Author: Alok Kumar Singh
 */

const sellOrders = new Map();
const buyOrders = new Map();
const {v4: idGenerator} = require('uuid');
const LinkedList = require('../store/LInkedList');

const createOrder = (coinType, price, quantity) => {

    /* Creating order*/
    const orderId = idGenerator();
    const currentOrder = {
        orderId, 
        coinType,
        price,
        quantity,
        completed: 0
    };

    return currentOrder;
}

/* Add order to linked list */
const addOrder = (order, orderMap) => {

    const {coinType, price} = order;

    if(!orderMap.has(coinType)) orderMap.set(coinType, new Map());
    const coinMap = orderMap.get(coinType); 
    
    if(!coinMap.has(price)) coinMap.set(price, new LinkedList());
    
    const orderList = coinMap.get(price);
    orderList.pushBack(order);

    return orderList;
}

/* Utility function for getting minimum value */
const getMinimum = (first, second) => {
    return (first < second ? first : second);
}

/* To perform match and commit orders */
const performMatch = (buyList, sellList) => {
    if(buyList.isEmpty() || sellList.isEmpty()) 
    {
        console.log('Empty');
        return;
    }

    console.log('Matching...\n');

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

        console.log('remainingSellOrder: ' + remainingSellOrder);
        console.log('remainingBuyOrder: ' + remainingBuyOrder);

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

/**
 * Method for finding match for buy and sell orders and committing deals 
 */

const findMatchAndUpdate = (coinType, price) => {
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

    performMatch(buyList, sellList);
}

const addSellOrder = (coinType, price, quantity) => {
    if(!coinType || !price || !quantity){
        throw new Error('Null values not accepted!');
    }

    /* Create order */
    const order = createOrder(coinType, price, quantity);   
    const orderList = addOrder(order, sellOrders);

    console.log('current\n');

    orderList.inorder();
    findMatchAndUpdate(coinType, price);


    // For debugging only
    orderList.inorder();
}

const addBuyOrder = (coinType, price, quantity) => {
    if(!coinType || !price || !quantity){
        throw new Error('Null values not accepted!');
    }

    /* Create order */
    const order = createOrder(coinType, price, quantity);   
    const orderList = addOrder(order, buyOrders);

    console.log('current\n');
    orderList.inorder();

    findMatchAndUpdate(coinType, price);

    // For debugging only
    orderList.inorder();
}

addSellOrder('BTC', 100, 2);
addBuyOrder('BTC', 100, 3);
addBuyOrder('BTC', 100, 5);
addSellOrder('BTC', 100, 10);
addBuyOrder('BTC', 20, 3);
addBuyOrder('BTC', 20, 100);
addSellOrder('BTC', 20, 5);
// addSellOrder('BTC', 100, 2);
// addSellOrder('ETH', 50, 3);