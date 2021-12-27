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
        const INRPrice = getINRVAlue(price);
        const response = {
            symbol,
            price : INRPrice
        }
        const len = symbol.length;
        const symb = symbol.substring(0, len-4);    
        // notify function for sending the push notification 
        console.log(response);
        notify(symb, INRPrice);

        callback(response); 
      });
}
module.exports = currentData