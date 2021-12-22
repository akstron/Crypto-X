import React from 'react'
import {Row,Col,Card,Statistic} from 'antd';
import { Link } from 'react-router-dom';
import {ArrowUpOutlined} from '@ant-design/icons';
import millify from 'millify';


const PortfolioCard = ({coinGrowth}) => {

    console.log(coinGrowth)
    return (
        <div>
            <Row gutter={[32,32]} className='crypto-card-container'>
                    {coinGrowth?.map((coin,id)=>(
                        <Col key={id} xs={24} sm={12} lg={6} className='crypto-card'>
                            <Link to={`/crypto/${coin.id}`}>
                                <Card
                                    title={`${coin.coinType}`}
                                    // extra={<img className='crypto-image' alt='img' src={coin.iconUrl}/>}
                                    hoverable
                                >
                                <Row>
                                    <Col span={12}><Statistic title="Total Investment ($)" value={millify(coin.costPrice)}/></Col>
                                    {/* <Col span={12}><Statistic title="Net Worth ($)" value={millify(1256)}/></Col> */}
                                    <Col span={12}><Statistic title="Quantity ($)" value={millify(coin.quantity)}/></Col>
                                    <Col span={12}><Statistic title="Total Sale ($)" value={millify(coin.sellPrice)}/></Col>
                                    <Col span={12}><Statistic title="Growth" value={coin.percentGrowth} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%"/></Col>
                                </Row>  
                                </Card>                      
                            </Link>
                        </Col>
                    ))}
                </Row>
        </div>
    )
}

export default PortfolioCard
