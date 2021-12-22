const { addNotification } = require("../store/NotificationMap");

module.exports.storeNotification = (req, res) => {
    const {coin, userId, price, type} = req.body;

    const data = {
        coin,
        userId,
        price,
        type
    }

    addNotification(data);
}