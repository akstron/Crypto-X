import React,{useState} from 'react'
import {Card,Typography,Row,Col,Statistic,Popover,Button} from 'antd';
import { PlusCircleOutlined,MinusCircleOutlined,LoadingOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import walletIcon from '../../../Images/wallet.png'
import AmountConfirm from './AmountConfirm.jsx'
import CoinEntry from './CoinEntry'
const {Text} = Typography;

const WalletCard = () => {

    const [wallet,setWallet] = useState({data:undefined,isFetching:true});

    const confirm=()=>{
    }

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
                            {(wallet.isFetching)?(
                                <LoadingOutlined style={{margin:"0.8rem"}}/>
                            ):(
                                <Statistic title="Account Balance ($)" value={wallet.balance} precision={2} />
                            )}
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            {/* Add Loading Atrribute */} 
                            <Popover content={<AmountConfirm/>} title={<strong>💰 Enter Amount</strong>} trigger="click">
                                <Button> <PlusCircleOutlined style={{margin:"0rem"}}/>Add</Button>
                            </Popover>
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <Button> <MinusCircleOutlined style={{margin:"0rem"}}/>Withdraw</Button>
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>
                    {(!wallet.isFetching)?(
                         <LoadingOutlined style={{margin:"2rem"}}/>
                    ):(
                        <Row  style={{ marginTop:"1rem",textAlign:"center"}}>
                            {(true)?(
                                <>
                                <Col span={24}>
                                    <ExclamationCircleOutlined />
                                </Col>
                                <Col span={24}>
                                    No Coins in Wallet.
                                </Col>
                                </>
                            ):(
                                <>
                                    <CoinEntry coinSymbol={"BTC"} coinQuantity={18.93}/>
                                    <CoinEntry coinSymbol={"BTC"} coinQuantity={18.93}/>
                                    <CoinEntry coinSymbol={"BTC"} coinQuantity={18.93}/>
                                    <CoinEntry coinSymbol={"BTC"} coinQuantity={18.93}/>
                                </>
                            )}
                            
                        </Row>
                    )}
                    
            </Card>
            
        </div>
    )
}

export default WalletCard
