import React,{useState}from 'react'
import { Card,Row,Col,Statistic,Form, InputNumber, Button,Radio,message} from 'antd';
import millify from 'millify';
import moment from 'moment';
import LineChart from '../Utils/LineChart'
import axios from 'axios';

const CoinSummary = ({coin}) => {

    const [ordering,setOrdering]=useState(false);

    const [form] = Form.useForm();

    const coinHistory={
        data:{
            change:coin.change,
            history:coin.history.map((price,id)=>({price:price,timestamp:new Date(new Date().getTime() - (id * 60 * 60 * 1000)).getTime()})),
        }
    }

    const layout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 12,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 8,
        },
    };
    
    const placeOrder=(orderDetails)=>{
        setOrdering(true);
        const orderRoute = process.env.REACT_APP_BACKEND +'/'+ orderDetails.category;
        const order={
            coinType:orderDetails.coinType,
            price:orderDetails.price,
            quantity:orderDetails.quantity,
        }
        axios.post(orderRoute,order, {withCredentials: true}).then(res => {
            console.log(res);
            message.success("Order Placed !");
            setOrdering(false);
            const orderId=(res.data.orderId);
            //Redirect -> Step 3
        }).catch(error => {
            console.log(error.response.data.error);
            message.error(error.response.data.error)
            setOrdering(false)
        })
    }

    const onFinish = values => {
        const orderDetails={
            coinType:coin.symbol,
            quantity:values.noOfCoins,
            price:values.price,
            category:values.category,
        };
        console.log(orderDetails);
        placeOrder(orderDetails);
    }

    const handleTotal = (_, values) => {
       if(values?.price && values?.noOfCoins){
            form.setFieldsValue({amount:(values.price*values.noOfCoins)})
       }else{
            form.setFieldsValue({amount:(0)})

       }
    }
    
    return (
        <div>
            <Row>
                <Col xs={{span:24}} md={{span:12}}>
                        <Card
                            title={"1. Selected Coin : "+ (coin.name)}
                            extra={<img className='crypto-image' alt='img' src={coin.iconUrl} height={'35px'}/>}
                            style={{margin:"1rem auto",width:"fit-content"}}
                            hoverable>
                                <Row>
                                    <Col span={8}><Statistic title="Price" value={"$"+millify(coin?.price)} /></Col>
                                    <Col span={8} style={{display:"inline"}}><Statistic title="Change" value={millify(coin?.change)+"%"} style={{display:"inline"}}/></Col>
                                    <Col span={8}><Statistic title="Market Cap" value={millify(coin?.marketCap)}/></Col>
                                    <Col span={8}><Statistic title="Volume" value={millify(coin?.volume)}/></Col>
                                    <Col span={8}><Statistic title="All Time High" value={"$"+millify(coin?.allTimeHigh.price)}/></Col>
                                    <Col span={8}><Statistic title="Listed" value={moment(coin?.listedAt*1000).startOf('ss').fromNow()}/></Col>
                                </Row> 
                        </Card>
                        <Card>
                            <LineChart coinHistory={coinHistory} currentPrice={coin.price} coinName={coin.name}/>
                        </Card>
                </Col>
                <Col  xs={{span:24}} md={{span:12}}>
                    <Card
                        title={`2. Coins Amount`}
                        hoverable
                        style={{margin:"1rem auto",width:"fit-content",padding:"1rem"}}>
                        <Form {...layout} form={form} name="control-ref" onFinish={onFinish} onValuesChange={handleTotal} style={{margin:"1rem auto",width:"fit-content"}}>
                            <Form.Item
                                name="noOfCoins"
                                label="No Of Coins "
                                rules={[
                                    {
                                    required: true,
                                    message: "No Of Coins can't be Zero!"
                                    },
                                ]}
                                >
                                <InputNumber defaultValue={0} min={0}/>
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    {
                                    required: true,
                                    message: "Price Of Coins can't be Zero!"
                                    },
                                ]}>
                                    <InputNumber defaultValue={0} min={0}/>
                            </Form.Item>
                            <Form.Item
                                name="amount"
                                label="Net Amount :"
                                rules={[
                                    {
                                    required: true,
                                    message: "Amount can't be Zero!"
                                    },
                                ]}>
                                <InputNumber defaultValue={0} min={0} disabled={true}/> 
                            </Form.Item>
                            <Form.Item label="Category" name="category" style={{width:"fit-content"}}
                                rules={[
                                    {
                                    required: true,
                                    message: "Choose category!"
                                    },
                                ]}>
                                    <Radio.Group>
                                        <Radio.Button value="buy">Buy</Radio.Button>
                                        <Radio.Button value="sell">Sell</Radio.Button>
                                    </Radio.Group>
                            </Form.Item>      
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" loading={ordering}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>    
                </Col>
            </Row>
            
            
        </div>
    )
}

export default CoinSummary
