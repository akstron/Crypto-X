import React from 'react'
import { Line } from 'react-chartjs-2';

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
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
            },
            },
        ],
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default LivePlot
