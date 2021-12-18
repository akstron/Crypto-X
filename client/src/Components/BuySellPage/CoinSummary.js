import React from 'react'
import { Card,Row,Col,Statistic,Form, InputNumber, Button,Radio} from 'antd';
import millify from 'millify';
import moment from 'moment'
const CoinSummary = ({coin,next}) => {

    const [form] = Form.useForm();

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
    
    const onFinish = values => {
        console.log('Received values of form:', values);
        next();
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
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                                <Button type="primary" htmlType="submit">
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
