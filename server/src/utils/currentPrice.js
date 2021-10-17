const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko();

const currentPrice = async (coin) => {
    const data = await CoinGeckoClient.coins.fetch(coin);
    return data.data.market_data.current_price.usd;
}


module.exports = currentPrice
