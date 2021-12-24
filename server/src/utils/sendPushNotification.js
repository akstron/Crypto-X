const {getNotificationList} = require('../store/NotificationMap');
const { webpush } = require('./pushNotificationSubscription');
const subscribeMap = require('../store/subscriptionMap')

const notfiy = (coin, price) => {
    handleLessThanNotification(coin, price);
    handleGreaterThanNotification(coin, price);
}
const handleLessThanNotification = (coin, price) => {
    const lessArray = getNotificationList(coin, price, 'less');
    const message = '${coin} reached at ${price}';
    const payload = JSON.stringify({ title: "crypto-x" , body: message});
    
    for(var i=0; i<lessArray.length; i++){
        const userId = lessArray[i].userId;
        send(userId);
    }
}

const handleGreaterThanNotification = (coin, price) => {
    const greaterArray = getNotificationList(coin, price, 'greater');
    const message = '${coin} crossed ${price}';
    const payload = JSON.stringify({ title: "crypto-x" , body: message});
    
    for(var i=0; i<lessArray.length; i++){
        const userId = greaterArray[i].userId;
        //TODO: get subscription from database (user userId from here)
        send(userId);
    }
}

const send = (userId) => {
    const endPoints = subscribeMap.get(userId);
        if(!endPoints){
            for (var it = endPoints.values(), val= null; val=it.next().value; ) {
                console.log(val);
                webpush
                .sendNotification(val, payload)
                .catch(err => console.error(err));
            }
        }
}

module.exports = notfiy