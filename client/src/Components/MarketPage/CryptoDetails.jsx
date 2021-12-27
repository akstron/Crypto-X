import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col} from 'antd';
import StatsPlot from "./CoinPlot/StatsPlot.js"
import Loader from '../Utils/Loader'
import CoinDetailsHeading from './CryptoDetails/CoinDetailsHeading.js'
import CoinStats from './CryptoDetails/CoinStats.js'

const CryptoDetails = () => {
    const {coinId} = useParams();
    
    const [coinDetails,setcoinDetails]=useState({details:undefined,isFetching:true});

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
                    
                    <StatsPlot coinId={coinId} coinDetails={coinDetails?.details}/>
                    <CoinStats coinDetails={coinDetails}/>

                </Col>
            </div>
        )}
        
        </>
    )
}

export default CryptoDetails
