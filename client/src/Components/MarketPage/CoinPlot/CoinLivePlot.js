import React,{useState,useContext,useEffect} from 'react'
import { AppSocketContext } from '../../../App';
import {returnData,returnOption} from './returnData'
import { Col,Row, Typography} from 'antd';
import { Line } from 'react-chartjs-2';

const { Title } = Typography;

const CoinLivePlot = ({coinSymbol}) => {

    const socket = useContext(AppSocketContext);
	const [coinPrice,setCoinPrice]=useState({price:[],timeStamp:[]});
    const [currentPrice,setCurrentPrice]=useState(0);
    var ChartRef=undefined

	useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on(`coin_${coinSymbol.replace('*', '')}`,(coin)=>{
                setCoinPrice((oldPrices)=>{
                    var newPrices=oldPrices;
                    if(newPrices.price.length>30){
                        newPrices.price.shift();
                        newPrices.timeStamp.shift();
                    }
                    newPrices.price.push(coin);
                    newPrices.timeStamp.push((new Date()).toLocaleTimeString());
                    return newPrices;
                })
                setCurrentPrice(coin)
                if(ChartRef) ChartRef.update();
            })
        }
        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off(`coin_${coinSymbol}`);
        }

    },[socket,ChartRef,coinSymbol]);

	
	return (
		<>
            <div >
                <Row className="chart-header">
                    <Title level={2} className="chart-title">Live Price Chart </Title>
                    <Col className="price-container">
                        {/* <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title> */}
                        <Title level={5} className="current-price">Current {coinSymbol} Price: $ {currentPrice}</Title>
                    </Col>
                </Row>
                <Line
                    ref={(reference)=>{ChartRef=reference}} 
                    data={returnData(coinPrice)} options={returnOption(coinPrice)}/>

            </div>
		</>
	)
}

export default CoinLivePlot
