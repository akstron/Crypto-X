const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko();

const currentPrice = (coin, callback) => {
    const start = async () => {
        let data = await CoinGeckoClient.coins.fetch(coin);
        return data.data.market_data.current_price.usd;
    }
    
    start().then((result) => {
        callback(result);
    }).catch((e) => {
        console.log(e);
    })
}



module.exports = currentPrice
