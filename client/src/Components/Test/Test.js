import React,{useState,useContext,useEffect} from 'react'
import { AppSocketContext } from '../../App';
import LivePlot from './LivePlot'
import { Row, Typography } from 'antd';

const { Title } = Typography;

const Test = () => {

    const socket = useContext(AppSocketContext);
	const [coinPrice,setCoinPrice]=useState({price:[],timeStamp:[]});

	useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            
                socket.on(`coin_BTC`,(coin)=>{
                    console.log('coin Price... ', coin);
                    setCoinPrice((oldPrices)=>{
                    	var newPrices=oldPrices;
                    	if(newPrices.price.length>30){
                    		newPrices.price.shift();
                    		newPrices.timeStamp.shift();
                    	}
                    	newPrices.price.push(coin);
                    	newPrices.timeStamp.push((new Date()).toString());
                    	return newPrices;
                    })
                })
            
            
        }
        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off(`coin_BTC`);
        }

    },[socket]);

	
	return (
		<>
            <Row className="chart-header">
                <Title level={2} className="chart-title">Live Price Chart </Title>
            </Row>
			<LivePlot coinPrice={coinPrice}/>
		</>
	)
}

export default Test
