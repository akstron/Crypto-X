import React from "react";
import CoinList from '../CoinList/CoinList';

import {cryptoCoins} from '../Data/data'

import'./App.css'


function App() {
  return (
    <div className='container'>
        <CoinList cryptoCoinsList={cryptoCoins}/>
    </div>
  )
}

export default App