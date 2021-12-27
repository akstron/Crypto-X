import React,{useState,useEffect} from 'react'
import { Typography,Card,Button,Row,Col,Form, Input,Tabs  } from 'antd';
import { PlusCircleOutlined,LoadingOutlined} from '@ant-design/icons';
import BankCard from './BankCard'
import axios from 'axios';
import bankIcon from '../../Images/bankIcon.png'
import WalletIcon from '../../Images/wallet.png'
import CardIcon from '../../Images/cardIcon.png'

const { Title } = Typography;
const { TabPane } = Tabs;

const BankOptions = () => {

    const [loading,setLoading]=useState(false);

    const [bankAccount,setBankAccount]=useState({
        name:undefined,
        account_number:undefined,
        ifsc:undefined,
        upiId:undefined,
        isFetching:true
    });

    const layout = {
        labelCol: { offset: 4,span: 6 },
        wrapperCol: { span: 10 },
    };

    const addAccount=(name,account_number,ifsc)=>{
        const accountRoute = process.env.REACT_APP_BACKEND + '/addAccount';
        const accountDetails={name:name, account_number:account_number,ifsc:ifsc };
        setBankAccount({
            name:undefined,
            account_number:undefined,
            ifsc:undefined,
            upiId:undefined,
            isFetching:true,
        });
        
        axios.post(accountRoute,accountDetails ,{withCredentials: true}).then(res => {
            if(res['data']['status']){
                console.log(res.data);
            }
            getBankAccount();
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);

        })
    }

    const addUPI=(UPI_id)=>{
        const upiRoute = process.env.REACT_APP_BACKEND + '/addUPI';
        axios.post(upiRoute,{UPI_id:UPI_id} ,{withCredentials: true}).then(res => {
            console.log(res.data);
            if(res['data']['status']){
                console.log(res.data);
            }
            getBankAccount();
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);

        })
    }

    const submitBankAccount=(values)=>{
        console.log("Adding A/C :",values);
        setLoading(true);
        addAccount(values.name,values.account,values.ifsc)
    }

    const submitUPI=(values)=>{
        console.log("Adding UPI :",values);
        setLoading(true);
        addUPI(values.upiid);
    }

    const getBankAccount=()=>{
        const upiRoute = process.env.REACT_APP_BACKEND + '/getBankingOptions';
        setBankAccount({
            name:undefined,
            account_number:undefined,
            ifsc:undefined,
            upiId:undefined,
            isFetching:true
        })
        axios.get(upiRoute,{withCredentials: true}).then(res => {
            if(res['data']['status']){
                const bankAc={
                    name:res.data.account.name,
                    account_number:res.data.account.account_number,
                    ifsc:res.data.account.ifsc,
                    upiId:res.data.account.UPI_id,
                    isFetching:false
                };
                console.log(bankAc);
                setBankAccount(bankAc);
            }else{
                setBankAccount({
                    name:undefined,
                    account_number:undefined,
                    ifsc:undefined,
                    upiId:undefined,
                    isFetching:false
                })
            }
        }).catch(error => {
            console.log(error);
            setBankAccount({
                name:undefined,
                account_number:undefined,
                ifsc:undefined,
                upiId:undefined,
                isFetching:false
            })
        })
    }

    useEffect(()=>{
        getBankAccount();
    },[])

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
                                {(bankAccount.isFetching)?(
                                    <>
                                        <LoadingOutlined style={{margin:"0.8rem auto",fontSize: "xx-large"}}/>
                                    </>
                                ):(
                                    <Col span={24}><BankCard Name={bankAccount.name} AccountNo={bankAccount.account_number} ifsc={bankAccount.ifsc} upiId={bankAccount.upiId}/></Col>
                                )}
                            </Row>                            
                        </Col>
                        <Col xs={{span:24}} lg={{span:16}}  style={{padding:".5rem"}}>
                                <Row style={{borderBottom:".5px dotted black",backgroundColor:"transparent",margin:"0.5rem auto",padding:".5rem 0rem"}}>
                                    <Col span={20}>
                                        <Title level={4}><img className='crypto-image' alt='img' src={CardIcon} height={'40px'}/> Add New Methods </Title>
                                    </Col>
                                    <Col span={4} style={{textAlign:"center"}}>
                                        <Button type="primary" shape="circle"><PlusCircleOutlined/></Button>
                                    </Col>
                                </Row>
                                <Card
                                style={{borderRadius:"2rem",margin:".5rem auto",maxWidth:"500px"}}
                                hoverable >
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="Add Account" key="1">
                                            <Form name="control-hooks" {...layout} onFinish={submitBankAccount}>
                                                <Form.Item name="name" label="Name :" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="account" label="Account No:" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="ifsc" label="IFSC Code:" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                                    <Button type="primary" htmlType="submit" loading={loading}>
                                                        Save Account
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                    </TabPane>
                                    <TabPane tab="Add UPI" key="2">
                                        <Form name="control-hooks" {...layout} onFinish={submitUPI}>
                                            <Form.Item name="name" label="Name :" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="upiid" label="UPI ID :" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item wrapperCol={{ offset: 0, span: 24 }}  >
                                                <Button type="primary" htmlType="submit" loading={loading}>
                                                    Save UPI
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                                </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default BankOptions
