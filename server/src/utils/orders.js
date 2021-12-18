const getActiveOrders = async (user) => {
    await user.populate({
        path: 'activeOrders',
        select: ['_id', 'orderType', 'coinType', 'price', 'quantity', 'completed']
    });

    return user.activeOrders;
}

const getOrders = async (user) => {
    await user.populate({
        path: 'orders',
        select: ['_id', 'orderType', 'coinType', 'price', 'quantity', 'completed']
    });

    return user.orders;
}

module.exports = {
    getActiveOrders, 
    getOrders
};