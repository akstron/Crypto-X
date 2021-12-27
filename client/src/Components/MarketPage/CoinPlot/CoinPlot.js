import React,{useState,useEffect}from 'react'
import SelectOption from '../CryptoDetails/SelectOption.js'
import Loader from '../../Utils/Loader'
import LineChart from '../../Utils/LineChart.js'
import millify from 'millify';

const CoinPlot = ({coinId,coinDetails}) => {
    
    const [timePeriod, setTimePeriod] = useState('7d');
    const [priceData,setPriceData]=useState({priceHistory:undefined,isFetching:true});

    useEffect(() => {
        var axios = require("axios").default;

        const getCoinPriceHistory=(coinId,range)=>{
            setPriceData({
                priceHistory:undefined,
                isFetching:true,
            })
            var options = {
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/coin/'+coinId+'/history/'+range,
            headers: {
                    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                    'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                setPriceData({
                    priceHistory:response.data,
                    isFetching:false,
                })
            }).catch(function (error) {
                console.error(error);
            });
        }

        let isComponentMounted=true;
        if(isComponentMounted) {
            getCoinPriceHistory(coinId,timePeriod);
        }
        return () => {
            isComponentMounted=false;
        }
    }, [coinId,timePeriod])

    return (
        <div>
            <SelectOption setTimePeriod={setTimePeriod}/>
            {(priceData.isFetching)?(
                <Loader/>
            ):(
                <>
                    <LineChart coinHistory={priceData.priceHistory} currentPrice={millify(coinDetails.price)} coinName={coinDetails.name}/>
                </>
            )}
        </div>
    )
}

export default CoinPlot
