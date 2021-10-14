import React from "react";
// import CoinList from '../CoinList/CoinList';
// import {cryptoCoins} from '../Data/data'
import'./App.css'
import Login from "../Login/Login";
function App() {
  return (
    <div className='container'>
        {/* <CoinList cryptoCoinsList={cryptoCoins}/> */}
        <Login/>
    </div>
  )
}

export default App