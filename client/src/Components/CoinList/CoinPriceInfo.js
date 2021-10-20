import React from 'react'
import Chart from '../Graphs/chart';

import './CoinPriceInfo.css'

function CoinPriceInfo({coinPrice,priceData,options}){
    console.log(priceData);
    const data = {
        labels: priceData.timeStamps,
        datasets: [{
            label: 'Ethereum',
            backgroundColor: 'rgb(0, 128, 0)',
            borderColor: 'rgb(0, 128, 0)',
            data: priceData.priceData,
        }]
    }

    return (
        <>
        <div className='coin-price-graph'>
            <Chart data={data} options={options}/>
            <h3 className='Coin-price'>$ {coinPrice} /-</h3>
        </div>
        </>
    );
}

export default CoinPriceInfo;