import React from 'react'
import {Card,Typography,Row,Col,Statistic,Progress,Button} from 'antd';
import { PlusCircleOutlined} from '@ant-design/icons';
import orderIcon from '../../Images/orderIcon.png'
const {Text} = Typography;

const OrdersCard = () => {
    return (
        <div>
            <Card 
                style={{width: "fit-content",
                        margin:".5rem auto",
                        borderRadius:"2rem",
                        padding:".2rem",
                        textAlign: "center"}}
                hoverable>

                    <Row>
                        <Col xs={{span:24}} md={{span:4}}  style={{textAlign:"center"}} >
                            <img  alt='img' src={orderIcon} height={'45px'} style={{display: "inline",margin:".2rem"}}/>
                        </Col>
                        <Col xs={{span:24}} md={{span:20}}  style={{textAlign:"center"}} >
                            <Text strong style={{margin:".2rem",fontSize:"x-large"}}> Orders </Text>
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>

                    <Row span={24} >
                        <Col xs={{span:24}} md={{span:6}}>
                            <Statistic title="Coin" value={"BTC"} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:9}}>
                            <Statistic title="Quantity" value={1} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:9}}>
                            <Statistic title="Amount($)" value={+128.93} precision={2} valueStyle={{ color: '#3f8600' }}/>
                        </Col>
                        <Col span={24}>
                            <Progress percent={70} size="small" />
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>

                    <Row span={24} >
                        <Col xs={{span:24}} md={{span:6}}>
                            <Statistic title="Coin" value={"DOG"} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:9}}>
                            <Statistic title="Quantity" value={2.5} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:9}}>
                            <Statistic title="Amount($)" value={+18.9} precision={2} valueStyle={{ color: 'red' }}/>
                        </Col>
                        <Col span={24}>
                            <Progress percent={40} size="small" />
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>
                                        <Row span={24} >
                        <Col xs={{span:24}} md={{span:6}}>
                            <Statistic title="Coin" value={"BTC"} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:9}}>
                            <Statistic title="Quantity" value={0.5} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:9}}>
                            <Statistic title="Amount($)" value={+128.93} precision={2} valueStyle={{ color: '#3f8600' }}/>
                        </Col>
                        <Col span={24}>
                            <Progress percent={1000} size="small" />
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>
            </Card>
            
        </div>
    )
}

export default OrdersCard
