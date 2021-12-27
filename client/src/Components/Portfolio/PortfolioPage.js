import React, { useState, useEffect } from 'react'
import { Typography, Divider, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PieDonut from '../Utils/PieDonut'

import portfolioIcon from '../../Images/portfolioIcon.png';
import coinIcon from '../../Images/money-bag.png';
import millify from 'millify';
import PortfolioCard from './PortfolioCard'
import WalletIcon from '../../Images/wallet.png'
import axios from 'axios';

const { Title } = Typography;

const getCoinsName=(portfolio)=>(portfolio.data.coins.map((coin,id)=>(coin.coinType)))
const getInvestment=(portfolio)=>(portfolio.data.coins.map((coin,id)=>(coin.costPrice)))
const getCoinsSale=(portfolio)=>(portfolio.data.coins.map((coin,id)=>(coin.sellPrice)))

// 3 Case : not verified,no balance,no coins
const PortfolioPage = ({simplified}) => {

    const [portfolio, setPortfolio] = useState({ data: undefined, isFetching: true });

    const getPortfolio = () => {
        const portfolioRoute = process.env.REACT_APP_BACKEND + '/getOverallPortfolio';

        axios.get(portfolioRoute, { withCredentials: true }).then(res => {

            if (res['data']['portfolio']) {
                setPortfolio({
                    data: res.data.portfolio,
                    isFetching: false
                });
            }
        }).catch(error => {
            console.log(error);
            setPortfolio({
                data: undefined,
                isFetching: false
            });
        })
    }

    useEffect(() => {
        getPortfolio();
    }, [])

    return (
        <div>
            <div className="portfolio-div">
                {!simplified && 
                (<div className="portfolio-heading-div">
                    <Title level={2}>
                        <img src={portfolioIcon} alt='ImgIcon' height={'50px'} style={{ margin: '0rem .8rem ' }} />
                        Porfolio
                    </Title>
                </div>)}
                <div className="portfolio-stats" style={{ textAlign: "center" }}>
                    <Divider orientation="right">
                        <Title level={4}>
                            <img src={WalletIcon} alt='ImgIcon' height={'40px'} style={{ margin: '0rem .8rem ' }} />
                            Wallet
                        </Title>
                    </Divider>

                    {(portfolio.isFetching) ? (
                        <>
                            <LoadingOutlined style={{ margin: "2rem auto", fontSize: "xxx-large" }} />
                        </>
                    ) : (
                        <>
                            {(!portfolio.data)?(
                                <>Something Went Wrong !</>
                            ):(
                                <Row>

                                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}><Statistic title="Total Investment (₹)" value={millify(portfolio.data.totalCostPrice)} /></Col>
                                    <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Net Worth (₹)" value={millify(1256)}/></Col>
                                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}><Statistic title="Total Sale (₹)" value={millify(portfolio.data.totalSellPrice)} /></Col>
                                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}><Statistic title="Growth" value={portfolio.data.totalPercentGrowth} precision={2} valueStyle={(portfolio.data.totalPercentGrowth > 0) ? ({ color: '#3f8600' }) : ({ color: 'red' })} prefix={(portfolio.data.totalPercentGrowth > 0) ? (<ArrowUpOutlined />) : (<ArrowDownOutlined />)} suffix="%" /></Col>
                                    {(portfolio.data.coins.length>0)?
                                        (<>
                                            <Col xs={{ span: 24 }} md={{ span: 12 }}><PieDonut Heading="Investment" CoinsName={getCoinsName(portfolio)} CoinsData={getInvestment(portfolio)} /></Col>
                                            <Col xs={{ span: 24 }} md={{ span: 12 }}><PieDonut Heading="Sales" CoinsName={getCoinsName(portfolio)} CoinsData={getCoinsSale(portfolio)} /></Col>
                                        </>)
                                        :(<>
                                            <Col span={24}>
                                                <ExclamationCircleOutlined />
                                            </Col>
                                            <Col span={24}>
                                                No Coins in Wallet.
                                            </Col>
                                        </>)}
                                </Row>
                            )}

                        </>
                    )}

                </div>
                {!simplified && (
                    <div className="portfolio-coins" style={{ textAlign: "center" }}>

                        <Divider orientation="left">
                            <Title level={4}>
                                <img src={coinIcon} alt='ImgIcon' height={'40px'} style={{ margin: '0rem .8rem ' }} />
                                Coins Performance
                            </Title>
                        </Divider>
                        {(portfolio.isFetching) ? (
                            <>
                                <LoadingOutlined style={{ margin: "2rem auto", fontSize: "xxx-large" }} />
                            </>
                        ) : (
                            <>
                            {(portfolio.data?.coins.length>0)?
                                (<>
                                    <PortfolioCard coinGrowth={portfolio.data.coins} />
                                </>)
                                :(<>
                                        <Col span={24}>
                                            <ExclamationCircleOutlined />
                                        </Col>
                                        <Col span={24}>
                                            No Coins in Wallet.
                                        </Col>
                                </>)}
                            </>
                        )}
                        <Divider />
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default PortfolioPage
