const {getNotificationList} = require('../store/NotificationMap');
const { webpush } = require('./pushNotificationSubscription');
const subscribeMap = require('../store/subscriptionMap')

const notfiy = (coin, price) => {
    handleLessThanNotification(coin, price);
    handleGreaterThanNotification(coin, price);
}
const handleLessThanNotification = (coin, price) => {
    const data = {
        coin,
        price,
        type: 'less'
    }
    const lessArray = getNotificationList(data);
    const message = '${coin} reached at ${price}';
    const payload = JSON.stringify({ title: "crypto-x" , body: message});
    
    for(var i=0; i<lessArray.length; i++){
        const userId = lessArray[i].userId;
        send(userId, payload);
    }
}

const handleGreaterThanNotification = (coin, price) => {
    const data = {
        coin,
        price,
        type: 'greater'
    }
    const greaterArray = getNotificationList(data);
    // if(coin === 'BTC'){
    //     console.log(greaterArray);
    // }
    const message = '${coin} crossed ${price}';
    const payload = JSON.stringify({ title: "crypto-x" , body: message});
    
    for(var i=0; i<greaterArray.length; i++){
        const userId = greaterArray[i].userId;
        //TODO: get subscription from database (user userId from here)
        console.log('userId.. ', userId);
        send(userId, payload);
        
        console.log('payload.. ', payload);
    }
}

const send = (userId, payload) => {
    const endPoints = subscribeMap.get(userId);
    console.log('endPoints ..  ', endPoints)
        if(endPoints){
            for (var it = endPoints.values(), val= null; val=it.next().value; ) {
                console.log('val', val);
                console.log('webpush.. ', webpush)
                webpush
                .sendNotification(val, payload)
                .catch(err => console.error(err));
            }
        }
}

module.exports = notfiy