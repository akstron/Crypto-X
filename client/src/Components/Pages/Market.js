import { useEffect, useState } from 'react';
import {cryptoCoins} from '../Data/data'
import Coin from '../CoinList/Coin';
import './Market.css'
import MarketOptions from '../Options/MarketOptions'
import TradeOptions from '../Options/TradeOptions';
import {Row,Col} from 'react-bootstrap';
import { fetchData } from '../Data/data';
import CoinHistory from '../CoinList/CoinHistory';
//Now Data will be fetched here ....
const Market = ({cryptoCoinList}) => {

    const [cryptoCoinOptions,setCryptoCoinOption]=useState({Coin:cryptoCoinList[0],Range:604800});     
    const [isLoaded,setisLoaded]=useState(false);     

    const setPlot=(cryptoCoinSelected)=>{
        setCryptoCoinOption(cryptoCoinSelected);
    }

    return (
        <>
            {/* {console.log("cryptoCoin for rendering---")}
            {console.log(cryptoCoin)} */}
            <div className='market-div'>
                {console.log("cryptoCoin :: ")}
                {/* {console.log(cryptoCoin)} */}
                <MarketOptions setPlot={setPlot} cryptoCoinList={cryptoCoinList} Coin={cryptoCoinOptions.Coin}/>
                {/* Add remove Function otherwise will crash */}
                {/* {console.log(cryptoCoin)} */}
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