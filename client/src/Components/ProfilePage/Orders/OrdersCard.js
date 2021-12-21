import React,{useEffect,useState} from 'react'
import {Card,Typography,Row,Col,Statistic,Progress} from 'antd';
import { PlusCircleOutlined,MinusCircleOutlined,LoadingOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import orderIcon from '../../../Images/orderIcon.png';
import axios from 'axios';

const {Text} = Typography;

const OrdersCard = () => {

    const [orders,setOrders]=useState({data:undefined,isFetching:true});

    const getOrders=()=>{
        const ordersRoute = process.env.REACT_APP_BACKEND + '/getorders';
        
        axios.get(ordersRoute, {withCredentials: true}).then(res => {
            console.log(res['data']['orders']);
            
            if(res['data']['status']){
                const orders=(res['data']['orders']);
                setOrders({
                    data:orders,
                    isFetching:false
                });
            }
        }).catch(error => {
            console.log(error);
            setOrders({
                data:undefined,
                isFetching:false
            });
        })
    }

    useEffect(()=>{
        getOrders();
    },[])

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

                    {(orders.isFetching)?(
                        <LoadingOutlined style={{margin:"2rem"}}/>
                    ):(
                        <>
                            {(orders?.data?.length==0)?(
                                <>
                                    <Col span={24}>
                                        <ExclamationCircleOutlined />
                                    </Col>
                                    <Col span={24}>
                                        No Orders Placed Yet !
                                    </Col>
                                </>
                            ):(
                                <>
                                    {orders?.data.map((order,id)=>(
                                        <>
                                            <Row span={24} >
                                                <Col xs={{span:24}} md={{span:6}}>
                                                    <Statistic title="Coin" value={order.coinType} precision={2} />
                                                </Col>
                                                <Col xs={{span:24}} md={{span:9}}>
                                                    <Statistic title="Quantity" value={order.quantity} precision={2} />
                                                </Col>
                                                <Col xs={{span:24}} md={{span:9}}>
                                                    <Statistic title="Amount($)" value={order.price} precision={2} valueStyle={(order.orderType=="sell")?({color: 'red'}):({color: '#3f8600'})}/>
                                                </Col>
                                                <Col span={24}>
                                                    <Progress percent={order.completed*100} size="small" />
                                                </Col>
                                            </Row>
                                            <hr style={{margin:"0.5rem"}}/>

                                        </>
                                    ))}
                            </>
                            )}
                        </>
                    )}
            </Card>
            
        </div>
    )
}

export default OrdersCard
