import React,{useState,useEffect} from "react";
import axios from "axios";
import millify from 'millify';
import { Typography,Row,Col, Statistic } from 'antd'
import {Loader} from '../../Components'
import homeIcon from '../../Images/homepage-icon.png'

const {Title} =Typography

const CoinsStat =()=> {
    
    const [coinStat,setCoinsStat] = useState({data:undefined,isFetching:true});

    useEffect(() => {
        let isComponentMounted = true;
        const fetchState=()=> {
            const options = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/stats',
                headers: {
                    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                    'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
                }
            };

        axios.request(options).then((response)=>{
            setCoinsStat({
                data:(response.data.data),
                isFetching:false,
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
        
        if(isComponentMounted) fetchState();

        return (() => {
            isComponentMounted = false;
        })
    },[]);
    
    return (
        <>
            <Title level={2} className='"heading'>
                <img src={ homeIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                Crypto Currencies Information
            </Title>
            {(coinStat.isFetching)?(
                <Loader />
            ):(
                <>
                    <Row>
                        <Col span={12}><Statistic title="Total CryptoCurrencies" value={coinStat.data.totalCoins}/></Col>
                        <Col span={12}><Statistic title="Total Exchanges" value={millify(coinStat.data.totalExchanges)}/></Col>
                        <Col span={12}><Statistic title="Total Market Cap" value={millify(coinStat.data.totalMarketCap)}/></Col>
                        <Col span={12}><Statistic title="Total 24h Volume" value={millify(coinStat.data.total24hVolume)}/></Col>
                        <Col span={12}><Statistic title="Total Market" value={millify(coinStat.data.totalMarkets)}/></Col>
                    </Row>                        
                </>
            )}
        </>
    )
}

export default CoinsStat;