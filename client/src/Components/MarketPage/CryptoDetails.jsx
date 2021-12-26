import React, { useState,useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col} from 'antd';

import Loader from '../Utils/Loader'
import LineChart from '../Utils/LineChart.js'
import CoinDetailsHeading from './CryptoDetails/CoinDetailsHeading.js'
import SelectOption from './CryptoDetails/SelectOption.js'
import CoinStats from './CryptoDetails/CoinStats.js'

import { AppSocketContext } from '../../App';


const CryptoDetails = () => {
    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const [priceData,setPriceData]=useState({priceHistory:undefined,isFetching:true});
    const [coinDetails,setcoinDetails]=useState({details:undefined,isFetching:true});
    const socket = useContext(AppSocketContext);
    const [livePrice,setLivePrice]=useState({data:[]});

    useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on(`coin_BTC`,(coin)=>{
                console.log(`Live Data BTC:`,coin)
                setLivePrice((oldPrice)=>{
                    var time = new Date();
                    var newPrice = oldPrice;
                    if(newPrice.data.length > 30) newPrice.data.shift(); 

                    newPrice.data.push({price:coin,timeStamp:time});
                    return newPrice; 
                })               
            })
        }

        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off(`coin_BTC`);
        }

    },[socket,livePrice]);


    useEffect(()=>{
        var axios = require("axios").default;
        const getCoinDetailsAPI=(coinId)=>{
            const options = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/coin/'+coinId,
                headers: {
                    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                    'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
                }
            };
            axios.request(options).then(function (response) {
                console.log(response.data);
                setcoinDetails({
                    details:response.data.data.coin,
                    isFetching:false,
                })
            }).catch(function (error) {
                console.error(error);
            });
        }
        let isComponentMounted=true;
        if(isComponentMounted) {
            getCoinDetailsAPI(coinId);
        }
        return () => {
            isComponentMounted=false;
        }
    },[coinId])
    
    useEffect(() => {
        var axios = require("axios").default;

        const getCoinPriceHistory=(coinId,range)=>{
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
        <>
        {(coinDetails.isFetching)?(
            <>
                <Loader/>
            </>
        ):(
            <div>
                <Col className="coin-detail-container">
                    <CoinDetailsHeading coinDetails={coinDetails?.details}/>
                    {/* make loader funtional */}
                    <SelectOption setTimePeriod={setTimePeriod}/>
                    {(priceData.isFetching)?(
                        <Loader/>
                    ):(
                        <>
                            <LineChart coinHistory={priceData.priceHistory} currentPrice={millify(coinDetails.details?.price)} coinName={coinDetails.details?.name}/>
                        </>
                    )}
                    <CoinStats coinDetails={coinDetails}/>

                </Col>
            </div>
        )}
        
        </>
    )
}

export default CryptoDetails
