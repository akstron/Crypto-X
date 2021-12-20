import React,{useEffect} from 'react'
import { Result, Button,Card ,message} from 'antd';
import axios from 'axios';

const OrderCard = ({orderDetails}) => {

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
            }).catch(error => {
                console.log(error.response.data.error);
                message.error(error.response.data.error)
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
                    status="success"
                    title="Successfully Purchased"
                    subTitle="Order number: 2017182818828182881 it may take 1-5 minutes, please wait."
                    extra={[
                    <Button type="primary" key="console">
                        Go Orders
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Card>
            
        </div>
    )
}

export default OrderCard;