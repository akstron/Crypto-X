import React from 'react'
import {Card,Typography,Row,Col,Statistic,Divider,Button} from 'antd';
import { PlusCircleOutlined,MinusCircleOutlined } from '@ant-design/icons';
import walletIcon from '../../Images/wallet.png'
const {Text} = Typography;

const WalletCard = () => {
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
                            <img  alt='img' src={walletIcon} height={'25px'} style={{display: "inline",margin:".2rem"}}/>
                        </Col>
                        <Col xs={{span:24}} md={{span:20}}  style={{textAlign:"center"}} >
                            <Text strong style={{margin:".2rem",fontSize:"x-large"}}> Wallet </Text>
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>

                    <Row span={24}  style={{ margin:"1rem auto 0rem auto",width:"fit-content"}}>
                        <Col xs={{span:24}} md={{span:24}}>
                            <Statistic title="Account Balance ($)" value={128.93} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            {/* Add Loading Atrribute */}
                            <Button> <PlusCircleOutlined style={{margin:"0rem"}}/>Add</Button>
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Button> <MinusCircleOutlined style={{margin:"0rem"}}/>Withdraw</Button>
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>
                    <Row  style={{ marginTop:"1rem"}}>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Statistic title="BTC" value={18.93} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Statistic title="DOGE" value={18.93} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Statistic title="POL" value={18.93} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Statistic title="BTC" value={18.93} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Statistic title="DOGE" value={18.93} precision={2} />
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Statistic title="POL" value={18.93} precision={2} />
                        </Col>
                    </Row>
            </Card>
            
        </div>
    )
}

export default WalletCard
