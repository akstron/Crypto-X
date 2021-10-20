/**
 * Methods related to statictic of coin prices
 */

const CoinGecko = require('coingecko-api')
const binance = require('../config/binanceApi');

/**
 * TODO: Remove CoinGecko and add binance instead
 */

const CoinGeckoClient = new CoinGecko();

module.exports.getCurrentPrice = async (coin) => {
    const data = await CoinGeckoClient.coins.fetch(coin);
    return data.data.market_data.current_price.usd;
}

/* Return percent change for 24hrs */
module.exports.getPercentChange = async (coinSymbol) => {

    /* USDT is equivalent to 1$ */
    const trade = coinSymbol + 'USDT';

    return new Promise((resolve, reject) => {
        binance.prevDay(trade, (error, prevDay, symbol) => {
            if(error) return reject(error);

            /*
                lastPrice: Recent price,
                prevClosePrice: 24hr previous price
            */

            console.info("Price change percent: "+prevDay.priceChangePercent+"%")
            resolve({
                priceChangePercentage: prevDay.priceChangePercent,
                priceChange: prevDay.priceChange,
            });
        });
    })
}