import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';
import './Market.css'

const Market = () => {
    return (
        <div className='market-div'>
            <Coin {...cryptoCoins[0]}/>
        </div>
    )
}

export default Market;