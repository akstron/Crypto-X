const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
});

const getCurrentPrice = async (coin) => {
    return await binance.prices(coin)
}

module.exports = getCurrentPrice;