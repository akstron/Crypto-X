import React from 'react'
import { Typography,Divider,Row,Col,Statistic } from 'antd';
import { ArrowUpOutlined} from '@ant-design/icons';

import portfolioIcon from '../../Images/portfolioIcon.png';
import coinIcon from '../../Images/money-bag.png';
import millify from 'millify';
import PortfolioCard from './PortfolioCard'
import WalletIcon from '../../Images/wallet.png'
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

const Test = () => {

    return (
        <div>
            <div className="portfolio-div">
                <div className="portfolio-heading-div">
                    <Title level={2}>
                        <img src={portfolioIcon} alt='ImgIcon' height={'50px'} style={{margin:'0rem .8rem '}}/>
                        Porfolio
                    </Title>
                </div>
                <div className="portfolio-stats">
                    <Divider orientation="right">
                        <Title level={4}>
                            <img src={WalletIcon} alt='ImgIcon' height={'40px'} style={{margin:'0rem .8rem '}}/>
                            Wallet
                        </Title>
                    </Divider>
                    <Row>
                        <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Total Investment ($)" value={millify(5216)}/></Col>
                        <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Net Worth ($)" value={millify(1256)}/></Col>
                        <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Total Gain ($)" value={millify(524)}/></Col>
                        <Col xs={{span:24}} md={{span:12}} xl={{span:6}}><Statistic title="Growth" value={11.28} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%"/></Col>
                    </Row>
                </div>
                <div className="portfolio-coins">
                    
                    <Divider orientation="left">
                        <Title level={4}>
                            <img src={coinIcon} alt='ImgIcon' height={'40px'} style={{margin:'0rem .8rem '}}/>
                            Coins Performance
                        </Title>
                    </Divider>
                    <PortfolioCard coinGrowth={coinGrowth}/>
                    <Divider/>
                </div>
            </div>
        </div>
    )
}

export default Test
