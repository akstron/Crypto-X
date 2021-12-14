import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CoinsTable } from './allCoinsTable/CoinsTable'
import BuyCoin from './BuyCoin/BuyCoin'
import OrderPool from './OrderPool/OrderPool'
import "./TradePage.css"

export const TradePage = ({allCoinsList}) => {
    return (
        <div className='Trade-page'>
            <div className="trade-page-heading">
                <h3>Buy/Sell Coins</h3>
                <h7>[ Select coins from list and chose options from given form ]</h7>
            </div>
            <Row>
                <Col className='coin-list'>
                    <CoinsTable allCoinsList={allCoinsList}></CoinsTable>
                </Col>
                <Col className='trade-section'>
                    <Row className='trade-card'>
                        <Col xl={6}>
                            <BuyCoin/>
                        </Col>
                        <Col xl={6}>
                            <OrderPool/>                        
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
