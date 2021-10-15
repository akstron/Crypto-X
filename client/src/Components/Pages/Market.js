import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';
import './Market.css'
import MarketOptions from '../Options/MarketOptions'

const Market = () => {
    return (
        <div className='market-div'>
            <MarketOptions/>
            {/* Add remove Function otherwise will crash */}
            <Coin {...cryptoCoins[0]}/>
        </div>
    )
}

export default Market;