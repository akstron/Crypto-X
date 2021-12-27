const Binance = require('node-binance-api');
const notify = require('./sendPushNotification')
const coinsArray = require('../store/CoinsList');
const getINRVAlue = require('./currencyConversion');

const binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
  });

const coins = coinsArray

const currentData = (callback) => {
  // binance websocket for getting latest price of each crypto
    binance.websockets.trades(coins, (trades) => { 
        let {s:symbol, p:price} = trades;
        const response = {
            symbol,
            price : getINRVAlue(price)
        }
        const len = symbol.length;
        const symb = symbol.substring(0, len-4);    
        // notify function for sending the push notification 
        notify(symb, price);

        callback(response); 
      });
}
module.exports = currentData