import React from 'react'
import "./Order.css"
import { ProgressBar } from 'react-bootstrap'

export const Order = () => {
    return (
        <div className='order-div'>
            <div className="coin-details">
                <img src="https://img.icons8.com/office/160/000000/bitcoin.png" alt="" height={"20px"} />
            </div>
            <div className="coin-details">
                BTC
            </div>
            <div className="coin-details">
                | 0.532 |
            </div>
            <div className="coin-details">
                 45% 
            </div>
            <div className="progress-div">
                <ProgressBar animated now={50} />
            </div>
        </div>
    )
}
