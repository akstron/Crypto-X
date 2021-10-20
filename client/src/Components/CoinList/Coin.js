import CoinImage from './CoinImage'
import CoinName from './CoinName'
// import CoinDetailInfo from './CoinDetailInfo';
import CoinPriceInfo from './CoinPriceInfo';
import CoinBalance from '../Portfolio/CoinBalance'
import './Coin.css'
import { Row,Col } from 'react-bootstrap';
import {options} from '../Data/data'

function Coin({Id,ImgURL,CoinTitle,CoinDetails,Currency,CoinPrices,CurrentPriceClose,CurrentPriceOpen,CurrentPriceHigh,CurrentPriceLow,CoinGrowth_24,removeCoin}){
    // console.log(CoinTitle)
    // console.log(CoinPrices)
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
                {/* <CoinDetailInfo coinDetails={coinDetails}/> */}
                {/* setUp Seperate Error for Card fetching error */}
                {console.log(CoinPrices)}
                <div className="Coin-price">
                    <CoinPriceInfo coinPrice={CurrentPriceClose} priceData={CoinPrices} options={options}/>
                </div>
            </div>
            <button type="button" className='btn btn-delete' onClick={()=>{
                removeCoin(Id);
            }}> Delete </button>
        </div>
    );
}

export default Coin;