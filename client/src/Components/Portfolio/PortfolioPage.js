import React,{useState,useEffect} from 'react'
import { Typography,Divider,Row,Col,Statistic } from 'antd';
import { ArrowUpOutlined,LoadingOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

import portfolioIcon from '../../Images/portfolioIcon.png';
import coinIcon from '../../Images/money-bag.png';
import millify from 'millify';
import PortfolioCard from './PortfolioCard'
import WalletIcon from '../../Images/wallet.png'
import axios from 'axios';

const { Title } = Typography;

const coinGrowth=[
        {
            id:1,
            name:'Bitcoin',
            costPrice:245,
            iconUrl:'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
            netWorth:1254,
            totalGain:125,
            growth:.25,
        },
        {
            id:2,
            name:'Bitcoin',
            costPrice:245,
            iconUrl:'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
            netWorth:1254,
            totalGain:125,
            growth:.25,
        },
        {
            id:3,
            name:'Bitcoin',
            costPrice:245,
            iconUrl:'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
            netWorth:1254,
            totalGain:125,
            growth:.25,
        },
    ]
// 3 Case : not verified,no balance,no coins
const Test = () => {

    const [portfolio,setPortfolio]=useState({data:undefined,isFetching:true});

    const getPortfolio=()=>{
        const portfolioRoute = process.env.REACT_APP_BACKEND + '/getPortfolio';
        
        axios.get(portfolioRoute, {withCredentials: true}).then(res => {
            console.log(res['data']);
            
            if(res['data']['portfolio']){
                setPortfolio({
                    data:res.data.portfolio,
                    isFetching:false
                });
            }
        }).catch(error => {
            console.log(error);
            setPortfolio({
                data:undefined,
                isFetching:false
            });
        })
    }

    useEffect(()=>{
        getPortfolio();
    },[])

    return (
        <div>
            <div className="portfolio-div">
                <div className="portfolio-heading-div">
                    <Title level={2}>
                        <img src={portfolioIcon} alt='ImgIcon' height={'50px'} style={{margin:'0rem .8rem '}}/>
                        Porfolio
                    </Title>
                </div>
                <div className="portfolio-stats" style={{textAlign:"center"}}>
                    <Divider orientation="right">
                        <Title level={4}>
                            <img src={WalletIcon} alt='ImgIcon' height={'40px'} style={{margin:'0rem .8rem '}}/>
                            Wallet
                        </Title>
                    </Divider>

                    {(portfolio.isFetching)?(
                        <>
                            <LoadingOutlined style={{margin:"2rem auto",fontSize:"xxx-large"}}/>
                        </>
                    ):(
                        <>
                            <Row>
                                <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Total Investment ($)" value={millify(portfolio.data.totalCostPrice)}/></Col>
                                {/* <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Net Worth ($)" value={millify(portfolio.data.1256)}/></Col> */}
                                <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Total Sale ($)" value={millify(portfolio.data.totalSellPrice)}/></Col>
                                <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Growth" value={portfolio.data.totalPercentGrowth} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%"/></Col>
                            </Row>    
                        </>
                    )}
                    
                </div>
                <div className="portfolio-coins">
                    
                    <Divider orientation="left">
                        <Title level={4}>
                            <img src={coinIcon} alt='ImgIcon' height={'40px'} style={{margin:'0rem .8rem '}}/>
                            Coins Performance
                        </Title>
                    </Divider>
                    {(portfolio.isFetching)?(
                        <>
                            <LoadingOutlined style={{margin:"2rem auto",fontSize:"xxx-large"}}/>
                        </>
                    ):(
                        <PortfolioCard coinGrowth={portfolio.data.coins}/>
                    )}
                    <Divider/>
                </div>
            </div>
        </div>
    )
}

export default Test
