import React from 'react'
import { Typography,Card,Button,Row,Col,Form, Input } from 'antd';
import { PlusCircleOutlined} from '@ant-design/icons';
import BankCard from './BankCard'
import bankIcon from '../../Images/bankIcon.png'
import WalletIcon from '../../Images/wallet.png'

const { Text,Title } = Typography;
const BankOptions = () => {
    const layout = {
        labelCol: { offset: 4,span: 4 },
        wrapperCol: { span: 12 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <div>
            <div className="banking-div">
                <div className="banking-headind-div">
                    <Title level={3} style={{margin:".5rem",padding:".5rem"}}><img alt='img' src={bankIcon} height={'30px'}/> Banking and Payment Options</Title>
                </div>
                <Title level={5} > ( Add and save different payment methods for adding and withdrawing from wallet. ) </Title>
                <hr/>
                <div className="saved-options">

                    <Row>
                        
                        <Col xs={{span:24}} lg={{span:8}} style={{padding:".5rem"}}>
                           
                                <Row style={{borderBottom:".5px dotted black",backgroundColor:"transparent",margin:"0.5rem auto",padding:".5rem 0rem"}}>
                                    <Col span={20}>
                                        <Title level={4}><img className='crypto-image' alt='img' src={WalletIcon} height={'40px'}/> Saved Methods </Title>
                                    </Col>
                                    <Col span={4} style={{textAlign:"center"}}>
                                        <Button type="primary" shape="circle"><PlusCircleOutlined/></Button>
                                    </Col>
                                </Row>
                            
                            <Row>
                                <Col span={24}><BankCard/></Col>
                                <Col span={24}><BankCard/></Col>
                                <Col span={24}><BankCard/></Col>
                                <Col span={24}><BankCard/></Col>
                            </Row>                            
                        </Col>
                        <Col xs={{span:24}} lg={{span:16}}  style={{padding:".5rem"}}>
                                <Row style={{borderBottom:".5px dotted black",backgroundColor:"transparent",margin:"0.5rem auto",padding:".5rem 0rem"}}>
                                    <Col span={20}>
                                        <Title level={4}><img className='crypto-image' alt='img' src={WalletIcon} height={'40px'}/> Add New Methods </Title>
                                    </Col>
                                    <Col span={4} style={{textAlign:"center"}}>
                                        <Button type="primary" shape="circle"><PlusCircleOutlined/></Button>
                                    </Col>
                                </Row>

                                <Form name="control-hooks" {...layout}>
                                    <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Form>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </div>
    )
}

export default BankOptions
