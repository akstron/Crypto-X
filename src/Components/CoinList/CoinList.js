import React,{useState} from 'react'
import Coin from './Coin';

import './CoinList.css'

const CoinList=({cryptoCoinsList})=>{

    const [cryptoCoins,setCryptoCoins] = useState(cryptoCoinsList);

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