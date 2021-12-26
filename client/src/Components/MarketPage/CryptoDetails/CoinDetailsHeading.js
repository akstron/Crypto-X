import React from 'react'
import { Col, Typography } from 'antd';

const { Title } = Typography;

const CoinDetailsHeading = ({coinDetails}) => {
    return (
        <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
                {coinDetails?.name} ({coinDetails?.slug}) Details
            </Title>
            <p>{coinDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </Col>
    )
}

export default CoinDetailsHeading
