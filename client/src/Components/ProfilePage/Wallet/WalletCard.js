import React,{useState,useEffect} from 'react'
import {Card,Typography,Row,Col,Statistic,Popover,Button} from 'antd';
import { PlusCircleOutlined,MinusCircleOutlined,LoadingOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import walletIcon from '../../../Images/wallet.png'
import AmountConfirm from './AmountConfirm.jsx'
import CoinEntry from './CoinEntry'
import axios from 'axios';
//Fetch Coin Quantity also !!
const {Text} = Typography;

const WalletCard = () => {

    const [wallet,setWallet] = useState({data:undefined,isFetching:true});

    const AddDummyCoin=()=>{
        const route = process.env.REACT_APP_BACKEND + '/addCoins';
        const coin={
            "coinType" : "BTC",
            "costPrice" : 50, 
            "sellPrice" : 18,
            "quantity" : 1.52
        }
        axios.post(route, coin, {withCredentials: true}).then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const getWalletDetails=()=>{
        const walletRoute = process.env.REACT_APP_BACKEND + '/getWallet';
        
        axios.get(walletRoute, {withCredentials: true}).then(res => {
            if(res['data']['status']){
                const wallet=(res['data']['wallet']);
                setWallet({
                    data:wallet,
                    isFetching:false
                });
            }
        }).catch(error => {
            console.log(error);
            setWallet({
                data:undefined,
                isFetching:false
            });
        })
    }

    const confirm=()=>{
    }

    useEffect(()=>{
        // AddDummyCoin();
        getWalletDetails();
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
                                <Statistic title="Account Balance ($)" value={wallet?.data?.balance} precision={2} />
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
                    {(wallet.isFetching)?(
                        <LoadingOutlined style={{margin:"2rem"}}/>
                    ):(
                        <Row  style={{ marginTop:"1rem",textAlign:"center"}}>
                            {(wallet?.data?.coins.length==0)?(
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
                                    {wallet?.data?.coins.map((coin,id)=>(
                                        <>
                                            <CoinEntry coinSymbol={coin.coinType} coinQuantity={18.93} key={id}/>
                                        </>
                                    ))}
                                </>
                            )}
                            
                        </Row>
                    )}
                    
            </Card>
            
        </div>
    )
}

export default WalletCard
