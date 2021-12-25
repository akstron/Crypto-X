const Binance = require('node-binance-api');
const notify = require('./sendPushNotification')

const binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
  });

const coins = ['BTCUSDT', 'ETHUSDT', 'DOGEUSDT', 'DOTUSDT', 'BNBUSDT',
'SOLUSDT', 'XRPUSDT', 'AXSUSDT', 'LTCUSDT', 'FILUSDT'];

const currentData = (callback) => {
    binance.websockets.trades(coins, (trades) => { 
        let {s:symbol, p:price} = trades;
        const response = {
            symbol,
            price
        }
        const len = symbol.length;
        const symb = symbol.substring(0, len-4);     
        notify(symb, price);
        //console.log(response);  

        callback(response); 
      });
}
module.exports = currentData