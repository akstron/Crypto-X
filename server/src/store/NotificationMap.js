const notificationMap = new Map();

const addNotification = ({coin, userId, price, type}) => {
    if(!notificationMap.has(coin)){
        notificationMap.set(coin, {
            lessArray: new Array(),
            greaterArray: new Array()
        });
    }
    //console.log(notificationMap.has(coin))
    if(type === 'less'){
        const lessArray = notificationMap.get(coin).lessArray;
        const index = floorIdx(lessArray, price);
        lessArray.splice(index+1, 0, {userId, price});
    }else{
        const greaterArray = notificationMap.get(coin).greaterArray
        const index = floorIdx(greaterArray, price);
        greaterArray.splice(index+1, 0, {userId, price});
        //console.log(notificationMap.get(coin).greaterArray)
    }
}

const getNotificationList = ({coin, price, type}) => {
    if(!notificationMap.has(coin))
        return new Array()
    
    if(type === 'less'){
        const lessArray = notificationMap.get(coin).lessArray;
        const index = ceilIdx(lessArray, price);
        const temp = new Array();
        var count = lessArray.length-index;
        while(count-->0){
            temp.push(lessArray.pop())
        }
        return temp;   
    }else{
        const greaterArray = notificationMap.get(coin).greaterArray;
        const index = floorIdx(greaterArray, price);
        const temp = new Array()
        if(coin === 'BTC'){
            console.log('----- ', greaterArray);
        }
        var count = greaterArray.length-index-1;
        while(count-->0){
            temp.push(greaterArray.pop())
        }
        notificationMap.get(coin).greaterArray = temp;
        return greaterArray 
    }
}

const floorIdx = (arr, target) => {
    var l = 0, r = arr.length-1, ans = -1;
    while(l<=r){
        const mid = l + (r-l)/2;
        if(arr[mid].price <= target){
            ans = mid;
            l = mid + 1;
        }else{
            r = mid - 1;
        }
    }
    return ans;
}

const ceilIdx = (arr, target) => {
    var l = 0, r = arr.length-1, ans = arr.length;
    while(l<=r){
        const mid = l + (r-l)/2;
        if(arr[mid].price >= target){
            ans = mid;
            r = mid - 1
        }else{
            l = mid + 1;
        }
    }
    return ans;
}



module.exports = {
    addNotification,
    getNotificationList
};