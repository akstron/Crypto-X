import React from "react";
// import CoinList from '../CoinList/CoinList';
// import {cryptoCoins} from '../Data/data'
import'./App.css'
// import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
function App() {
  return (
    <div className='container'>
        {/* <CoinList cryptoCoinsList={cryptoCoins}/> */}
        <SignUp/>
    </div>
  )
}

export default App