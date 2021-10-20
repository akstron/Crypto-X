// File Contains Dummy data to be recieved by database laterOn

export const favCryptoCoins=[
    {
        Id:1,
        ImgURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",
        CoinTitle:'Bitcoin',
        CoinName:'bitcoin',
        CoinSymbol:'BTCUSDT',
        Currency:'usd',
        CoinDetails:'A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.',
        CurrentPrice:25701.50,
        CoinGrowth_24:0.51,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        Range:604800,
    },
    {
        Id:2,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",
        CoinTitle:'Ethereum',
        CoinName:'ethereum',
        CoinSymbol:'ETHUSDT',
        Currency:'usd',
        coinDetails:'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.',
        CurrentPrice:25701.50,
        CoinGrowth_24:-0.21,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        Range:604800,
    },
    {
        Id:3,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",
        CoinTitle:'Dogecoin',
        CoinName:'dogecoin',
        CoinSymbol:'DOGEUSDT',
        Currency:'usd',
        CoinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',
        CurrentPrice:25701.50,
        CoinGrowth_24:0.1,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        Range:604800,
    },
    {
        Id:4,
        ImgURL :"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",
        CoinTitle:'Polkadot',
        CoinName:'polkadot',
        coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',
        coinPrice: 5907.53,
        CoinSymbol:'DOTUSDT',
        Currency:'usd',
        CurrentPrice:25701.50,
        CoinGrowth_24:-0.3,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        
    }
]

export const options = {
    animation:false,
    plugins: {
        legend: {
        display: false
        },
        title:'Custom'
    },
    elements: {
        line: {
            tension: 0.5
        }
    },
    scales: {
    x: {
        // type:'time',
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
    responsive: true,
    maintainAspectRatio:true,
};

