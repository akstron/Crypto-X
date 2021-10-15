import React from 'react'
import Chart from '../Graphs/chart';

import './CoinPriceInfo.css'

function CoinPriceInfo({coinPrice,data,options}){

    return (
        <>
        <div>
            <Chart data={data} options={options}/>
            <h3 className='Coin-price'>$ {coinPrice} /-</h3>
        </div>
        </>
    );
}

export default CoinPriceInfo;