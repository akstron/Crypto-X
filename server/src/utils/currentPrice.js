const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
});

const getCurrentPrice = async (coinSymbol) => {
    
    const trade = coinSymbol + 'USDT';
    const result = await binance.prices(trade);
    return result[trade];
}

module.exports = { getCurrentPrice };