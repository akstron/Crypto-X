const { addNotification } = require("../store/NotificationMap");

module.exports.storeNotification = (req, res) => {
    const {coin, price, type} = req.body;
    const userId = req.user.id;
    
    const data = {
        coin,
        userId,
        price,
        type
    }
    //console.log('storeNotification userId .. ', data);
    addNotification(data);
    res.status(200);
}