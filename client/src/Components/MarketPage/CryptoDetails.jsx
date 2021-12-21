import React, { useState,useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import Loader from '../Utils/Loader'
import LineChart from '../Utils/LineChart.js'

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const [priceData,setPriceData]=useState({priceHistory:undefined,isFetching:true});
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

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    let stats = undefined;
    let genericStats = undefined;

    if(! coinDetails.isFetching){

       stats = [
            { title: 'Price to USD', value: `$ ${coinDetails.details?.price && millify(coinDetails.details?.price)}`, icon: <DollarCircleOutlined /> },
            { title: 'Rank', value: coinDetails.details?.rank, icon: <NumberOutlined /> },
            { title: '24h Volume', value: `$ ${coinDetails.details?.volume && millify(coinDetails.details?.volume)}`, icon: <ThunderboltOutlined /> },
            { title: 'Market Cap', value: `$ ${coinDetails.details?.marketCap && millify(coinDetails.details?.marketCap)}`, icon: <DollarCircleOutlined /> },
            { title: 'All-time-high(daily avg.)', value: `$ ${millify(coinDetails.details?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
        ];

       genericStats = [
            { title: 'Number Of Markets', value: coinDetails.details?.numberOfMarkets, icon: <FundOutlined /> },
            { title: 'Number Of Exchanges', value: coinDetails.details?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
            { title: 'Aprroved Supply', value: coinDetails.details?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
            { title: 'Total Supply', value: `$ ${millify(coinDetails.details?.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
            { title: 'Circulating Supply', value: `$ ${millify(coinDetails.details?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
        ];

    }

    return (
        <>
        {(coinDetails.isFetching)?(
            <>
                <Loader/>
            </>
        ):(
            <div>
                <Col className="coin-detail-container">
                    <Col className="coin-heading-container">
                        <Title level={2} className="coin-name">
                            {coinDetails.details?.name} ({coinDetails.details?.slug}) Details
                        </Title>
                        <p>{coinDetails.details?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
                    </Col>
                    <Select defaultValue="7d" className="select-timeperiod" 
                        placeholder="Select Timeperiod" 
                        onChange={(value) => setTimePeriod(value)}>
                        {time.map((date) => <Option key={date}>{date}</Option>)}
                    </Select>
                    {(priceData.isFetching)?(
                        <Loader/>
                    ):(
                        <LineChart coinHistory={priceData.priceHistory} currentPrice={millify(coinDetails.details?.price)} coinName={coinDetails.details?.name}/>
                    )}
                    <Col className="stats-container">
                        <Col className="coin-value-statistics">
                            <Col className="coin-value-statistics-heading">
                                <Title level={3} className="coin-details-heading">{coinDetails.details?.name} Value Statistics</Title>
                                <p>An overview showing the statistics of {coinDetails.details?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                            </Col>
                            {stats.map(({ icon, title, value },key) => (
                                
                                <div key={key}>
                                <Col className="coin-stats">
                                    <Col className="coin-stats-name">
                                        <Text>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="stats">{value}</Text>
                                </Col>
                                </div>
                            ))}
                        </Col>
                        <Col className="other-stats-info">
                            <Col className="coin-value-statistics-heading">
                                <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                                <p>An overview showing the statistics of {coinDetails.details?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                            </Col>
                            {genericStats.map(({ icon, title, value },key) => 
                                <div key={key}>
                                    <Col className="coin-stats">
                                    <Col className="coin-stats-name">
                                        <Text>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="stats">{value}</Text>
                                    </Col>
                                </div>
                            )}
                        </Col>
                    </Col>
                    <Col className="coin-desc-link">
                        <Row className="coin-desc">
                            <Title level={3} className="coin-details-heading">What is {coinDetails.details?.name}?</Title>
                            {HTMLReactParser(coinDetails.details?.description)}
                        </Row>
                        <Col className="coin-links">
                        <Title level={3} className="coin-details-heading">{coinDetails.details?.name} Links</Title>
                        {coinDetails.details?.links?.map((link) => (
                            <Row className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">{link.type}</Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                            </Row>
                        ))}
                        </Col>
                    </Col>
                </Col>
            </div>
        )}
        
        </>
    )
}

export default CryptoDetails
