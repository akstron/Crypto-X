import React,{useState,useEffect} from 'react'
import { Result, Button,Card ,message,Row,Col,Statistic,Typography} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import axios from 'axios';

const {Title,Text} =Typography

const OrderCard = ({orderDetails}) => {
    console.log("Order Details",orderDetails);
    const [order,setOrder]=useState({orderId:undefined,isFetching:true});

    useEffect(()=>{
        let isComponentMounted = true;    
        const placeOrder=()=>{
            const orderRoute = process.env.REACT_APP_BACKEND +'/'+ orderDetails.category;
            const order={
                coinType:orderDetails.coinType,
                price:orderDetails.price,
                quantity:orderDetails.quantity,
            }
            console.log(order)
            axios.post(orderRoute,order, {withCredentials: true}).then(res => {
                console.log(res);
                message.success("Order Placed !");
                setOrder({
                    orderId:res.data.orderId,
                    isFetching:false,
                })
            }).catch(error => {
                console.log(error.response.data.error);
                message.error(error.response.data.error)
                setOrder({
                    orderId:undefined,
                    isFetching:false,
                })
            })
        }
            if(isComponentMounted){
            placeOrder();
        }
        return () => {
            isComponentMounted = false;
        }
    },[orderDetails]);

    return (
        <div>
            <Card
                style={{margin:"1rem auto",width:"fit-content",padding:"1rem"}}>
                <Result
                    icon={<SmileOutlined />}
                    style={{textAlign:"center"}}
                    title="Great, hold tight while we find a match !">
                        {(order.isFetching || !order.orderId)?(<></>):(
                            <>
                                <Title level={4}>Order Id : <Text>{order.orderId}</Text></Title> 
                                <Row span={24} >
                                    <Col xs={{span:24}} md={{span:6}}>
                                        <Statistic title="Coin" value={orderDetails.coinType} precision={2} />
                                    </Col>
                                    <Col xs={{span:24}} md={{span:9}}>
                                        <Statistic title="Quantity" value={orderDetails.quantity} precision={2} />
                                    </Col>
                                    <Col xs={{span:24}} md={{span:9}}>
                                        <Statistic title="Amount($)" value={(orderDetails.price)*(orderDetails.quantity)} precision={2} valueStyle={(orderDetails.orderDetailsType=="sell")?({color: 'red'}):({color: '#3f8600'})}/>
                                    </Col>
                                </Row>
                            <hr style={{margin:"0.5rem"}}/>
                            
                            </>
                        )}
                        <Link to='/profile'><Button type="primary">Go to Orders</Button></Link>
                </Result>
            </Card>
            
        </div>
    )
}

export default OrderCard;