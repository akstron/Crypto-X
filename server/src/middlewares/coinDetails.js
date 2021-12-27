require('dotenv').config();
const axios = require('axios');

// coin details middleware
module.exports.getCoinDetails = (req, res) => {
    const count = req.body.count;
    
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins?limit='+count,
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY
        }
    };

    axios.request(options).then(function (response) {
        res.send(response.data.data);
    }).catch(function (error) {
        console.error(error);
    });
    
}