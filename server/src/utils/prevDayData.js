const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
  });

const prevDayData = (callback) => {
    binance.websockets.prevDay(false, (error, response) => {
        if(error){
            return console.log(error);
        }
        const msg = {
            symbol: response.symbol,
            avgPrice: response.averagePrice,
            priceChange: response.priceChange,
            percentChange: response.percentChange,
            openTime: new Date(response.openTime),
            closeTime: new Date(response.closeTime),
            low: response.low,
            high: response.high
        }
        //console.log(msg);
        callback(msg);
      })
}

module.exports = prevDayData;
  