import millify from 'millify';
import { Card,Col,Button} from 'antd';
import { Link } from 'react-router-dom';
import { AppSocketContext } from '../../App';
import React,{useEffect,useContext,useState} from 'react';
import {FallOutlined,RiseOutlined} from '@ant-design/icons';

const CoinCard = ({currency,id}) => {

    const socket = useContext(AppSocketContext);
    const [livePrice,setLivePrice]=useState(currency.price)


    useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on(`coin_${currency.symbol}`,(coin)=>{
                console.log(`Live Data ${currency.symbol}:`,coin)
                setLivePrice(coin)                
            })
        }
        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off(`coin_${currency.symbol}`);
        }

    },[socket,currency]);

    return (
        <Col key={id} xs={24} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${currency.id}`}>
                <Card
                    style={{borderRadius:"2rem",textAlign: "center"}}
                    title={`${currency.rank}. ${currency.name}`}
                    extra={<img className='crypto-image' alt='img' src={currency.iconUrl}/>}
                    hoverable
                >
                    <p>Price : $ {livePrice}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>DailyChange : {millify(currency.change)} % {(currency.change < 0)?(<FallOutlined style={{color: "red"}} />):(<RiseOutlined style={{color: "green"}} />)}</p>
                    <Link to={`/BuySell?selectedCoin=${currency.symbol}`}>
                        <Button type='success'>
                            Trade
                        </Button>
                    </Link>
                    
                    <Button type='primary'>
                        More
                    </Button>

                </Card>
            </Link>
        </Col>
    )
}

export default CoinCard
