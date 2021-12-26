import millify from 'millify';
import { Card,Col} from 'antd';
import { Link } from 'react-router-dom';
import { AppSocketContext } from '../../App';
import React,{useEffect,useContext} from 'react';
import {FallOutlined,RiseOutlined} from '@ant-design/icons';

const CoinCard = ({currency,id}) => {

    const socket = useContext(AppSocketContext);

    useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on('currentData',(order)=>{
                // console.log('current Data ... ', order);
                
            })
        }
        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off('currentData');
        }

    },[socket]);

    return (
        <Col key={id} xs={24} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${currency.id}`}>
                <Card
                    style={{borderRadius:"2rem"}}
                    title={`${currency.rank}. ${currency.name}`}
                    extra={<img className='crypto-image' alt='img' src={currency.iconUrl}/>}
                    hoverable
                >
                    <p>Price : $ {currency.price}}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>DailyChange : {millify(currency.change)} % {(currency.change < 0)?(<FallOutlined style={{color: "red"}} />):(<RiseOutlined style={{color: "green"}} />)}</p>
                </Card>
            </Link>
        </Col>
    )
}

export default CoinCard
