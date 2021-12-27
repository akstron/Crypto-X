const { addNotification } = require("../store/NotificationMap");

// middleware for storing the information of a notification
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
    const response = addNotification(data);
    if(response){
        return res.status(200).json({});
    }else{
        return res.status(500).json({});
    }
    
}