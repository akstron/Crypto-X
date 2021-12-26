import React,{useState,useContext,useEffect} from 'react'
import { AppSocketContext } from '../../App';
import LivePlot from './LivePlot'

const Test = () => {

    const socket = useContext(AppSocketContext);
	const [coinPrice,setCoinPrice]=useState({price:[],timeStamp:[]});

	useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on(`coin_BTC`,(coin)=>{
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
			<LivePlot coinPrice={coinPrice}/>
		</>
	)
}

export default Test
