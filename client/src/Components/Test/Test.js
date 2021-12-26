import React,{useState,useContext,useEffect} from 'react'
import { AppSocketContext } from '../../App';
// import { Line } from 'react-chartjs-2';

const Test = () => {

    const socket = useContext(AppSocketContext);
	const [coinPrice,setCoinPrice]=useState(0);

	useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on(`coin_BTC`,(coin)=>{
				// console.log(coin)
				setCoinPrice((oldPrices)=>{					
					return oldPrices+1;
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
			{}
		</>
	)
}

export default Test
