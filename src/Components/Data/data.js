import {convertToDate} from '../Utils/utils'

export const cryptoCoins=[{
        Id:1,
        ImgURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",
        CoinTitle:'BitCoin',
        coinDetails:'A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.',
        coinPrice:25701.50,
    },
    {
        Id:2,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",
        CoinTitle:'Ethereum',
        coinDetails:'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.',
        coinPrice:3597.53,
    },
    {
        Id:3,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",
        CoinTitle:'DogeCoin',
        coinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',
        coinPrice: 237.53,
    },
    {
        Id:4,
        ImgURL :"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",
        CoinTitle:'Polkadot',
        coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',
        coinPrice: 5907.53,
    }
];

export const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

export const returnPriceData=()=>{

    var priceData = [];

    while(priceData.length < 18){
        var r = Math.floor(Math.random() * 10000) + 1;
        priceData.push(r);
    }
    
    const data = {
        labels: labels,
        datasets: [{
            label: 'Ethereum',
            backgroundColor: 'rgb(0, 128, 0)',
            borderColor: 'rgb(0, 128, 0)',
            data: priceData,
        }]
    }
    console.log(data);
    return data;
};

export const fetchPriceData=async()=>{
    const URL="https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631521153&to=1634113153";
    const priceDataResponse = await fetch(URL, { mode: 'cors' });
    const priceDataJSON = await priceDataResponse.json();
    const timeStampArr = priceDataJSON["prices"].map((price)=>{
        return convertToDate(price[0]);
    })
    var priceDataArr = priceDataJSON["prices"].map((price)=>{
        return Math.round(price[1]);
    })
    const data = {
        labels: timeStampArr,
        datasets: [{
            label: 'Ethereum',
            backgroundColor: 'rgb(0, 128, 0)',
            borderColor: 'rgb(0, 128, 0)',
            data: priceDataArr,
        }]
    }
    console.log(data);
    return data;
}

export const options = {
    plugins: {
        legend: {
        display: false
        }
    },
    elements: {
        line: {
            tension: 0.25
        }
    },
    scales: {
    x: {
        legend: {
            display: false
        },
        grid:{
        display:false
        }
    },
    y: {
        legend: {
            display: false
        },
        grid:{
            display:false
        }
    }
    },
    pointRadius: 0.5,
    pointHoverRadius: 1,
    
};
