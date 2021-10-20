import { useState } from 'react';
import './Market.css'
import MarketOptions from '../Options/MarketOptions'
import TradeOptions from '../Options/TradeOptions';
import {Row,Col} from 'react-bootstrap';
import CoinHistory from '../CoinList/CoinHistory';

//Now Data will be fetched here ....
const Market = ({cryptoCoinList}) => {

    const [cryptoCoinOptions,setCryptoCoinOption]=useState({Coin:cryptoCoinList[0],Range:604800});     

    const setPlot=(cryptoCoinSelected)=>{
        setCryptoCoinOption(cryptoCoinSelected);
    }

    return (
        <>
            <div className='market-div'>
                {console.log("cryptoCoin :: ")}
                <MarketOptions setPlot={setPlot} cryptoCoinList={cryptoCoinList} Coin={cryptoCoinOptions.Coin}/>
                {/* Add remove Function otherwise will crash */}
                    <Row>
                        <Col>
                            {console.log(cryptoCoinOptions)}
                            <CoinHistory {...cryptoCoinOptions.Coin}/>
                        </Col>
                        <Col>
                            <TradeOptions/>
                        </Col>
                    </Row>
            </div>
        </>
    ) 
}

export default Market;