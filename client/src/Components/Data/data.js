import {convertToDate} from '../Utils/utils'

export const cryptoCoins=[{
        Id:1,
        ImgURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",
        CoinTitle:'bitcoin',
        coinDetails:'A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.',
        coinPrice:25701.50,
    },
    {
        Id:2,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",
        CoinTitle:'ethereum',
        coinDetails:'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.',
        coinPrice:3597.53,
    },
    {
        Id:3,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",
        CoinTitle:'dogecoin',
        coinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',
        coinPrice: 237.53,
    },
    {
        Id:4,
        ImgURL :"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",
        CoinTitle:'polkadot',
        coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',
        coinPrice: 5907.53,
    }
];

//SomeTimes Breaks Unable to fetch
export const fetchPriceData=()=>{
    const URL="https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153";
    const priceDataResponse = fetch(URL)
        .then((resp)=>{
            if(resp.status>=200 && resp.status<=299){
                return resp.json();
            }
        }).then((result)=>{
            const timeStampArr = result["prices"].map((price)=>{
                return convertToDate(price[0]);
            })
            var priceDataArr = result["prices"].map((price)=>{
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
        }).catch((Error)=>{
        console.log(Error)
        return;
    });
    return priceDataResponse;
}

export const updatePriceData=(setPriceData,setError)=>{
        const URL="https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153";
        fetch(URL)
            .then((resp)=>{
                if(resp.status>=200 && resp.status<=299){
                    return resp.json();
                }else{
                    console.log(resp.Error);
                }
            }).then((result)=>{
                const timeStampArr = result["prices"].map((price)=>{
                    return convertToDate(price[0]);
                })
                var priceDataArr = result["prices"].map((price)=>{
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
                console.log(data)
                setPriceData(data);
                setError(false);
            }).catch((Error)=>{
                console.log(Error);
                setError(true);
            });   
    }

export const options = {
    plugins: {
        legend: {
        display: false
        }
    },
    elements: {
        line: {
            tension: 0.2
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
    responsive: true,
    maintainAspectRatio:true,
};

export function updatePriceAPI(cryptoCoin,range,currency,setPriceData,setError){
    var end=parseInt((new Date().getTime() / 1000).toFixed(0))
    var start=end-range;
    var URL='https://api.coingecko.com/api/v3/coins/'+cryptoCoin+'/market_chart/range?vs_currency='+currency+'&from='+start+'&to='+end;
    console.log(URL);
    fetch(URL)
        .then((resp)=>{
            if(resp.status>=200 && resp.status<=299){
                console.log("Response is Ok");
                return resp.json();
            }else{
                console.log(resp.Error);
            }
        }).then((result)=>{
            const timeStampArr = result["prices"].map((price)=>{
                return convertToDate(price[0]);
            })
            var priceDataArr = result["prices"].map((price)=>{
                return Math.round(price[1]);
            })
            const data = {
                labels: timeStampArr,
                datasets: [{
                    label: cryptoCoin,
                    backgroundColor: 'rgb(0, 128, 0)',
                    borderColor: 'rgb(0, 128, 0)',
                    data: priceDataArr,
                }]
            }
            console.log(data)
            setPriceData(data);
            setError(false);
        }).catch((Error)=>{
            console.log(Error);
            setError(true);
        });   
}


//SomeTimes Breaks Unable to fetch
export const fetchPriceAPI=(cryptoCoin,range,currency)=>{
    var end=parseInt((new Date().getTime() / 1000).toFixed(0))
    var start=end-range;
    var URL='https://api.coingecko.com/api/v3/coins/'+cryptoCoin+'/market_chart/range?vs_currency='+currency+'&from='+start+'&to='+end;
    const priceDataResponse = fetch(URL)
        .then((resp)=>{
            if(resp.status>=200 && resp.status<=299){
                console.log("Response is Ok");
                return resp.json();
            }
        }).then((result)=>{
            const timeStampArr = result["prices"].map((price)=>{
                return convertToDate(price[0]);
            })
            var priceDataArr = result["prices"].map((price)=>{
                return Math.round(price[1]);
            })
            const data = {
                labels: timeStampArr,
                datasets: [{
                    label: cryptoCoin,
                    backgroundColor: 'rgb(0, 128, 0)',
                    borderColor: 'rgb(0, 128, 0)',
                    data: priceDataArr,
                }]
            }
            console.log(data);
            return data;
        }).catch((Error)=>{
        console.log(Error)
        return;
    });
    return priceDataResponse;
}