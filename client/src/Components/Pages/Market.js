import { useState } from 'react';
import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';
import './Market.css'
import MarketOptions from '../Options/MarketOptions'

const Market = () => {
    const [cryptoCoin,setcrptoCoin]=useState({cryptoCoin:cryptoCoins[0],range:604800}); 

    const setPlot=(cryptoCoin)=>{
        setcrptoCoin(cryptoCoin);
    }

    return (
        <div className='market-div'>
            <MarketOptions setPlot={setPlot}/>
            {/* Add remove Function otherwise will crash */}
            {console.log(cryptoCoin)}
            <Coin {...cryptoCoin.cryptoCoin} range={cryptoCoin.range}/>
        </div>
    )
}

export default Market;