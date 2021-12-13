//To DO :: Shown at Profile Section
import CoinBalance from './CoinBalance';
import './Orders.css'
import { Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Orders = () => {

    let history = useHistory();

    const addMoney=()=>{
        history.push('/addMoney')
    }

    return (
        <div className='orders-div'>
            <div className="orders-heading ">
                <img src="https://cdn-icons.flaticon.com/png/512/2194/premium/2194649.png?token=exp=1634448981~hmac=531e11ebc8164856a5e3ad9a99c462f3" alt="" height='40px' />
                <h3>Orders</h3>
                <Button variant="primary" onClick={addMoney}>Add Money</Button>

            </div>
            <div className="orders-details">
                    <h4>Net :</h4>
                <div className="orders-balance">
                    <h2>0.</h2><h3>00</h3> INR
                </div>
            </div>
            <CoinBalance CoinName={'INR'} Balance={'2,233'} Growth={0.1}/>
            <CoinBalance CoinName={'BTC'} Balance={0.0023} Growth={-0.51}/>
            <CoinBalance CoinName={'DGC'} Balance={0.0034} Growth={0.32}/>
            <CoinBalance CoinName={'RBY'} Balance={0.023} Growth={-0.1}/>

        </div>
    )
}

export default Orders;