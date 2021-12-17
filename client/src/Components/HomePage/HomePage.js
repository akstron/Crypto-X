import React from 'react';
import { Link } from 'react-router-dom';
import { Typography,Row,Col, Statistic } from 'antd'
import {MarketPage,NewsPage,CoinsStat} from '../../Components'

import marketIcon from '../../Images/main-logo.png'
import newsIcon from '../../Images/news-icon.png'

const {Title} =Typography

const HomePage = () => {

    return (
        <div>
            <CoinsStat/>
            
            <div className="home-heading-container">
                <Title level={2} className='home-title'>
                    <img src={ marketIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                    Top Cryptocurrencies
                </Title>
                <Title level={4} className='show-more'><Link to="/Market">Show more</Link></Title>
            </div>
            <MarketPage simplified/>

                <div className="home-heading-container">
                    
                    <Title level={2} className='home-title'>
                        <img src={ newsIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                        Top Crypto News
                    </Title>
                    <Title level={4} className='show-more'><Link to="/News">Show more</Link></Title>
                </div> 
                <NewsPage simplified/>
               
        </div>
    )
}

export default HomePage
