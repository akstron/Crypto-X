import React from 'react'
import {Col,Statistic} from 'antd';

const CoinEntry = ({coinSymbol,coinQuantity}) => {
    return (
        <Col xs={{span:24}} md={{span:12}}>
            <Statistic title={coinSymbol} value={coinQuantity} precision={2} />
        </Col>
    )
}

export default CoinEntry
