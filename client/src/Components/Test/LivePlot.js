import React from 'react'
import { Line } from 'react-chartjs-2';
import { Col,Row, Typography } from 'antd';

const { Title } = Typography;

const LivePlot = ({coinPrice}) => {

    const data = {
        labels: coinPrice.timeStamp,
        datasets: [
        {
            label: 'Price In USD',
            data: coinPrice.price,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
        },
        ],
    };

    const options = {
        animation:false,
        plugins: {
            legend: {
            display: false
            },
            title:'Custom'
        },
        elements: {
            line: {
                tension: 0.2
            }
        },
        scales: {
        x: {
            legend: {
                display: false
            },
            grid:{
                display:false
            }
        },
        y: {
            legend: {
                display: false
            },
            grid:{
                display:false
            }
        }
        },
        pointRadius: 2,
        pointHoverRadius: 1,
        responsive: true,
        maintainAspectRatio:true,
    };
    


    return (
        <div>
            <Row className="chart-header">
                <Title level={2} className="chart-title">Live Price Chart </Title>
                <Col className="price-container">
                    {/* <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title> */}
                    <Title level={5} className="current-price">Current BTC Price: $ {coinPrice.currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </div>
    )
}

export default LivePlot
