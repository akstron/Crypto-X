const axios = require('axios');
module.exports.getCoinDetails = (req, res) => {
    const count = req.body.count;
    
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins?limit='+count,
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
        }
    };

    axios.request(options).then(function (response) {
        res.send(response.data.data);
    }).catch(function (error) {
        console.error(error);
    });
    
}