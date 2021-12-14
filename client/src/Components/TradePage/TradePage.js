import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CoinsTable } from './allCoinsTable/CoinsTable'
import BuyCoin from './BuyCoin/BuyCoin'
import OrderPool from './OrderPool/OrderPool'
import "./TradePage.css"

export const TradePage = ({allCoinsList}) => {
    return (
        <div className='Trade-page'>
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
