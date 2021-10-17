import { useState } from 'react';
import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';
import './Market.css'
import MarketOptions from '../Options/MarketOptions'
import TradeOptions from '../Options/TradeOptions';
import {Row,Col} from 'react-bootstrap';

const Market = () => {
    const [cryptoCoin,setcrptoCoin]=useState({cryptoCoin:cryptoCoins[0],range:604800}); 

    const setPlot=(cryptoCoin)=>{
        setcrptoCoin(cryptoCoin);
    }

    return (
        <div className='market-div'>
            <MarketOptions setPlot={setPlot} cryptoCoin={cryptoCoin.cryptoCoin}/>
            {/* Add remove Function otherwise will crash */}
            {console.log(cryptoCoin)}
                <Row>
                    <Col>
                        <Coin {...cryptoCoin.cryptoCoin} range={cryptoCoin.range}/>
                    </Col>
                    <Col>
                        <TradeOptions/>
                    </Col>
                </Row>
        </div>
    )
}

export default Market;