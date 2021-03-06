import React,{useEffect,useState,useContext} from 'react'
import { Result, Button,Row,Col,Statistic,Typography,Progress} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { AppSocketContext } from '../../App';


const {Title,Text} =Typography

const OrderCard = ({order}) => {

    const socket = useContext(AppSocketContext);

    const [orderProgress,setOrderProgress] =useState(Math.ceil((order.completed*100)/(order.quantity)))

    useEffect(()=>{
        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on('sendOrderNotification',(order)=>{
                console.log('order status... ', order);
                setOrderProgress(Math.ceil((order.completed*100)/(order.quantity)));
            })
        }
        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off('sendOrderNotification');
        }
    },[socket]);

    return (
        <div>
            {/* <Card
                style={{margin:"1rem auto",width:"fit-content",padding:"1rem"}}> */}
                <Result
                    icon={<SmileOutlined />}
                    style={{textAlign:"center",margin:"1rem auto",width:"fit-content"}}
                    title="Great, hold tight while we find a match !">
                        {(order.isFetching || !order.orderId)?(<></>):(
                            <>
                                
                                <Title level={4}>Order Id : <Text>{order.orderId}</Text></Title> 
                                <Row span={24} >
                                    <Col xs={{span:24}} md={{span:6}}>
                                        <Statistic title="Coin" value={order.coinType} precision={2} />
                                    </Col>
                                    <Col xs={{span:24}} md={{span:9}}>
                                        <Statistic title="Quantity" value={order.quantity} precision={2} />
                                    </Col>
                                    <Col xs={{span:24}} md={{span:9}}>
                                        <Statistic title="Amount($)" value={(order.price)*(order.quantity)} precision={2} valueStyle={(order.orderType==='buy')?({color: 'red'}):({color: '#3f8600'})}/>
                                    </Col>
                                </Row>
                                <Row span={24} >
                                    <Col span={24}>
                                            <Progress
                                                strokeColor={{
                                                    '0%': '#108ee9',
                                                    '100%': '#87d068',
                                                }}
                                                percent={orderProgress}
                                            />
                                    </Col>
                                </Row>
                                <hr style={{margin:"0.5rem"}}/>

                            </>
                        )}
                        <Link to='/profile'><Button type="primary">Go to Orders</Button></Link>
                </Result>
            {/* </Card> */}
        </div>
    )
}

export default OrderCard;