//To DO :: Shown at Profile Section
import './OrderPool.css'
import { Order } from './Order';

const OrderPool = () => {

    return (
        <div className='order-pool-div'>
            <div className="order-pool-heading ">
                <img src="https://cdn-icons.flaticon.com/png/512/3045/premium/3045670.png?token=exp=1639493537~hmac=2721f6fb6868b0b2c9522c680cae8366" alt="" height='40px' />
                <h3>Order-pool</h3>

            </div>
            <div className="order-pool-details">
                    <h4>No of Orders : 5</h4>
            </div>
            <div className="order-details">
                <Order CoinName={'INR'} Balance={'2,233'} Growth={0.1}/>
                <Order CoinName={'BTC'} Balance={0.0023} Growth={-0.51}/>
                <Order CoinName={'DGC'} Balance={0.0034} Growth={0.32}/>
                <Order CoinName={'DGC'} Balance={0.0034} Growth={0.32}/>
                <Order CoinName={'DGC'} Balance={0.0034} Growth={0.32}/>
            </div>
        </div>
    )
}

export default OrderPool;