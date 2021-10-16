const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko();

const fetchHistory = (date, coin, callback) => {
    async function start() {
        let data = await CoinGeckoClient.coins.fetchHistory(coin, {
            date: date
        });
        return data;
    }
    
    start().then((result) => {
        callback(undefined, result.data.market_data.current_price);
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = fetchHistory;