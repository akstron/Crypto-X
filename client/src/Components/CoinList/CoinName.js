import React from 'react'
import './CoinName.css'

function CoinName({CoinTitle}){
    return (
        <>
        <h2 className='coin-name'>
            {CoinTitle}
        </h2>
        </>
    );
}

export default CoinName;