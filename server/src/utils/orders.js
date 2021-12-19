/**
 * Methods used to handle orders
 */

const getActiveOrders = async (wallet) => {
    await wallet.populate({
        path: 'orders',
        select: ['_id', 'orderType', 'coinType', 'price', 'quantity', 'completed']
    });

    const activeOrder = [];
    wallet.orders.forEach(order => {
        if(order.quantity !== order.completed) activeOrder.push(order);
    })

    return activeOrder;
}

const getOrders = async (wallet) => {
    await wallet.populate({
        path: 'orders',
        select: ['_id', 'orderType', 'coinType', 'price', 'quantity', 'completed']
    });

    return wallet.orders;
}

module.exports = {
    getActiveOrders, 
    getOrders
};