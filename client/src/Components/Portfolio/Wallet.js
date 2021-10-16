//To DO :: Shown at Profile Section
import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';
import './Wallet.css'
const Wallet = () => {
    return (
        <div className='wallet-div'>
            <Coin {...cryptoCoins[0]}/>
        </div>
    )
}

export default Wallet;