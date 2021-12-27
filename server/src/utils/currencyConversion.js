const axios = require("axios").default;

var usdToInrValue;
const interval = 60 * 1000;   //1 minute

const options = {
    method: 'GET',
    url: 'https://freecurrencyapi.net/api/v2/latest?apikey=584ae940-665d-11ec-8b2d-c9a554bc510b',
}

axios.request(options).then(function (response) {
    usdToInrValue = response.data.data.INR;
}).catch(function (error) {
    console.error(error);
});

setInterval(()=>{
    axios.request(options).then(function (response) {
        usdToInrValue = response.data.data.INR;
    }).catch(function (error) {
        console.error(error);
    });
}, interval)

const getINRVAlue = (price) => {
    return price*usdToInrValue;
}

module.exports = getINRVAlue;



