import React from 'react'
import { CoinsTable } from './allCoinsTable/CoinsTable'
import "./TradePage.css"

export const TradePage = ({allCoinsList}) => {
    return (
        <div className='Trade-page'>
            <CoinsTable allCoinsList={allCoinsList}></CoinsTable>
        </div>
    )
}
