import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { Typography,Divider } from 'antd'
import {MarketPage,NewsPage,CoinsStat,PortfolioPage} from '../../Components'
import {RightCircleOutlined} from '@ant-design/icons';

import marketIcon from '../../Images/main-logo.png'
import newsIcon from '../../Images/news-icon.png'
import { UserContext } from '../../App';

const {Title} =Typography

const HomePage = () => {
    const User = useContext(UserContext);

    return (
        <div>
            <CoinsStat/>
            {(User.data)?(
                <PortfolioPage simplified/>
            ):(
                <></>
            )}
            <Divider orientation="left">
                <div className="home-heading-container">
                    <Title level={3} className='home-title'>
                        <img src={ marketIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                        Top Cryptocurrencies
                    </Title>
                    <Divider type="vertical"/>
                    <Title level={4} className='show-more'><Link to="/Market"><RightCircleOutlined /></Link></Title>
                </div>
            </Divider>

            <MarketPage simplified/>
            <Divider orientation="left">
                <div className="home-heading-container">
                    <Title level={3} className='home-title'>
                        <img src={ newsIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                        Top Crypto News
                    </Title>
                    <Divider type="vertical"/>
                    <Title level={4} className='show-more'><Link to="/News"><RightCircleOutlined /></Link></Title>
                </div> 
            </Divider>

            <NewsPage simplified/>
        </div>
    )
}

export default HomePage
