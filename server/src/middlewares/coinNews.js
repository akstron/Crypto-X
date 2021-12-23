const axios = require('axios');
module.exports.getCryptoNews = (req, res) => {
    const {coin, count} = req.body;
    const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {q: coin, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off',count:count},
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
        }
    };
    axios.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}