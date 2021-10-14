import React from "react";
import CoinList from '../CoinList/CoinList';
import {cryptoCoins} from '../Data/data'

function HomePage() {
  return (
    <div className='container'>
        <CoinList cryptoCoinsList={cryptoCoins}/>
    </div>
  )
}

export default HomePage