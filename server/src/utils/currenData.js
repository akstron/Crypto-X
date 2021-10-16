const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
  });

const currentData = (callback) => {
    binance.websockets.miniTicker(markets => {
        //console.log(markets)
        callback(markets);
    });
}

module.exports = currentData
  