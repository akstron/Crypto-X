import CoinImage from './CoinImage'
import CoinName from './CoinName'
import CoinPriceInfo from './CoinPriceInfo';
import CoinBalance from '../Portfolio/CoinBalance'
import './Coin.css'
import { Row,Col } from 'react-bootstrap';
import {options} from '../Utils/data'

function Coin({Id,ImgURL,CoinTitle,Currency,CoinPrices,CurrentPriceClose,CurrentPriceOpen,CurrentPriceHigh,CurrentPriceLow,CoinGrowth_24,removeCoin}){
    return (
        <div className="Coin">
            <div className="Coin-heading">
                <CoinImage ImgURL={ImgURL}/>
                <CoinName CoinTitle={CoinTitle}/> 
            </div>
            <div className='coin-details'>
                <Row>
                    <Col>
                        <CoinBalance CoinName={Currency} Balance={CurrentPriceOpen} Growth={CoinGrowth_24}/>
                        <CoinBalance CoinName={Currency} Balance={CurrentPriceClose} Growth={CoinGrowth_24}/>
                    </Col>
                    <Col>
                        <CoinBalance CoinName={Currency} Balance={CurrentPriceHigh} Growth={CoinGrowth_24}/>
                        <CoinBalance CoinName={Currency} Balance={CurrentPriceLow} Growth={CoinGrowth_24}/>
                    </Col>
                </Row>                
                <div className="Coin-price">
                    <CoinPriceInfo coinPrice={CurrentPriceClose} priceData={CoinPrices} options={options}/>
                </div>
            </div>

        </div>
    );
}

export default Coin;