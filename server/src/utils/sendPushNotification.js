const {getNotificationList} = require('../store/NotificationMap');
const { webpush } = require('./pushNotificationSubscription');
const subscribeMap = require('../store/subscriptionMap')

const notfiy = (coin, price) => {
    if(!coin || !price) return;
    handleLessThanNotification(coin, price);
    handleGreaterThanNotification(coin, price);
}

// function for handling notifications of less than or equal to price of a coin
const handleLessThanNotification = (coin, price) => {
    const data = {
        coin,
        price,
        type: 'less'
    }
    const lessArray = getNotificationList(data);
    const message = coin + ' reached at ' + price;
    const payload = JSON.stringify({ title: "crypto-x" , body: message});
    
    for(var i=0; i<lessArray.length; i++){
        const userId = lessArray[i].userId;
        send(userId, payload);
    }
}

// function for handling notifications of greater than or equal to price of a coin
const handleGreaterThanNotification = (coin, price) => {
    const data = {
        coin,
        price,
        type: 'greater'
    }
    const greaterArray = getNotificationList(data);
    const message = coin + ' crossed ' + price ;
    const payload = JSON.stringify({ title: "crypto-x" , body: message});
    
    for(var i=0; i<greaterArray.length; i++){
        const userId = greaterArray[i].userId;
        send(userId, payload);
    }
}

// function for sending web push notifications to a given user
const send = (userId, payload) => {
    const endPoints = subscribeMap.get(userId);
    console.log('endPoints ..  ', endPoints)
        if(endPoints){
            for (var it = endPoints.values(), val= null; val=it.next().value; ) {
                webpush
                .sendNotification(JSON.parse(val), payload)
                .catch(err => console.error(err));
            }
        }
}

module.exports = notfiy