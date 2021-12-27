import React from 'react'
import millify from 'millify';
import { Col, Row, Typography} from 'antd';
import HTMLReactParser from 'html-react-parser';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CoinStats = ({coinDetails}) => {

    const stats = [
        { title: 'Price to USD', value: `$ ${coinDetails.details?.price && millify(coinDetails.details?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetails.details?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${coinDetails.details?.volume && millify(coinDetails.details?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coinDetails.details?.marketCap && millify(coinDetails.details?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(coinDetails.details?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: coinDetails.details?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: coinDetails.details?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: coinDetails.details?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(coinDetails.details?.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(coinDetails.details?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <>
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">{coinDetails.details?.name} Value Statistics</Title>
                        <p>An overview showing the statistics of {coinDetails.details?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {stats.map(({ icon, title, value },key) => (
                        
                        <div key={key}>
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                        </div>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                        <p>An overview showing the statistics of {coinDetails.details?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value },key) => 
                        <div key={key}>
                            <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                            </Col>
                        </div>
                    )}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">What is {coinDetails.details?.name}?</Title>
                    {HTMLReactParser(coinDetails.details?.description)}
                </Row>
                <Col className="coin-links">
                <Title level={3} className="coin-details-heading">{coinDetails.details?.name} Links</Title>
                {coinDetails.details?.links?.map((link) => (
                    <Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">{link.type}</Title>
                    <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                    </Row>
                ))}
                </Col>
            </Col>
        </>

    )
}

export default CoinStats
