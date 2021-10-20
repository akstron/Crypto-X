export function convertToDate(unix_timestamp){
    var dateObj = new Date(unix_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = dateObj.getFullYear();
    var month = months[dateObj.getMonth()];
    var date = dateObj.getDate();
    var time = date +' '+ month + ' ' + year ;
    return time;
}

export const updatePriceAPI=async(cryptoCoin,range,currency,setPriceData,setLoading,setError)=>{
    var end=parseInt((new Date().getTime() / 1000).toFixed(0))
    var start=end-range;
    var URL='https://api.coingecko.com/api/v3/coins/'+cryptoCoin+'/market_chart/range?vs_currency='+currency+'&from='+start+'&to='+end;
    console.log(URL); //Don't Comment Out
    await fetch(URL)
        .then((resp)=>{
            if(resp.status>=200 && resp.status<=299){
                // console.log("Response is Ok");
                return resp.json();
            }else{
                console.log(resp.Error);
            }
        }).then((result)=>{
            const timeStampArr = result["prices"].map((price)=>{
                return convertToDate(price[0]);
            })
            var priceDataArr = result["prices"].map((price)=>{
                return Math.round(price[1]);
            })
            let CoinPrices={timeStamps:timeStampArr,priceData:priceDataArr};
            // console.log(CoinPrices);
            setPriceData(CoinPrices);
            setLoading(false)
            setError(false);
        }).catch((Error)=>{
            console.log(Error);
            setError(true);
        });   
}