import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';

const Market = () => {
    return (
        <div>
        <Coin key={cryptoCoins[0].Id} 
            {...cryptoCoins[0]}/>
        </div>
    )
}

export default Market;