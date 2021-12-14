import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Wallet from '../Portfolio/Wallet';
import { CoinsTable } from './allCoinsTable/CoinsTable'
import BuyCoin from './BuyCoin/BuyCoin'
import "./TradePage.css"

export const TradePage = ({allCoinsList}) => {
    return (
        <div className='Trade-page'>
            <Row>
                <Col>
                    <CoinsTable allCoinsList={allCoinsList}></CoinsTable>
                </Col>
                <Col>
                    <Row>
                        <BuyCoin/>
                    </Row>
                    <Row>
                        <Wallet/>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
