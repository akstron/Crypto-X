const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko();

const fetchMarketChartRange = (from, to, coin, callback) => {
    async function start() {
        let data = await CoinGeckoClient.coins.fetchMarketChartRange(coin, {
            from: from,
            to: to,
        })
        return data;
    }
    
    start().then((result) => {
        callback(undefined, result);
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = fetchMarketChartRange;