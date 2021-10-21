import React,{useState,useEffect} from 'react'
import Coin from './Coin';
import './CoinList.css'
import io from 'socket.io-client'

const socket=io(process.env.REACT_APP_BACKEND,{
    transports:['websocket','polling']
});


const CoinList=({cryptoCoinsList})=>{

    const [data,setData]=useState(undefined);
    const [cryptoCoins,setCryptoCoins] = useState(cryptoCoinsList);

    const socketConnect=()=>{
        socket.on('currentData',market=>{
            // console.log(market)
            setData(market)
            if(market.symbol!==undefined) setCryptoCoins((cryptoCoins)=>{
                if(cryptoCoins.length<1)return cryptoCoins;
                let newCryptoCoins=cryptoCoins;
                let currentDate=new Date();
                let dateStr=currentDate.getHours().toString()+':'+currentDate.getMinutes().toString();
                for(let i=0;i<newCryptoCoins.length;i++){
                    if(market.symbol===newCryptoCoins[i].CoinSymbol){
                        newCryptoCoins[i].CurrentPriceClose=Math.ceil(market['price']);
                    
                        if(newCryptoCoins[i].CoinPrices.priceData.length>100){
                            newCryptoCoins[i].CoinPrices.priceData.shift();
                            newCryptoCoins[i].CoinPrices.timeStamps.shift();
                        }
                        newCryptoCoins[i].CoinPrices.priceData.push(market['price']);
                        newCryptoCoins[i].CoinPrices.timeStamps.push(dateStr);
                    }
                }
                // console.log(newCryptoCoins)
                return newCryptoCoins;
            });
        });
    }

    useEffect(() => {
        let isComponentMounted = true;    
        if(isComponentMounted) socketConnect();        
        return (()=>{
          isComponentMounted = false;
          socket.emit('disconnection');
          socket.disconnect();
        });
    }, [])

    // Always gets latest List
    const removeCoin=(id)=>{
        setCryptoCoins((oldCryptoCoins)=>{
            let newCryptoCoins=oldCryptoCoins.filter((coin)=>coin.Id !== id);
            return newCryptoCoins;
        })
    }

    return (
        <>
        <section className='CoinList'>
            {cryptoCoins.map((cryptoCoin)=>{
                return (
                    <Coin key={cryptoCoin.Id} 
                        {...cryptoCoin} 
                        removeCoin={removeCoin}/>
                );
            })}
        </section>
        <button type="button" className='btn btn-delete' onClick={()=>{
            setCryptoCoins([]);
        }}> Clear All </button>
        </>
    );
}

export default CoinList;