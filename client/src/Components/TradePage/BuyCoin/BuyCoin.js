import React, { Component }  from 'react'
import TradeOptions from '../../Options/TradeOptions'
import './BuyCoins.css'

class BuyCoin extends Component {

    render() {
        return (
            <div>
                <div className="Buy-card">
                    <div className="buy-card-form">
                        <TradeOptions/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyCoin;