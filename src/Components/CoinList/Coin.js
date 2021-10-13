import React,{useState,useEffect} from 'react'
import CoinImage from './CoinImage'
import CoinName from './CoinName'
import CoinDetailInfo from './CoinDetailInfo';
import CoinPriceInfo from './CoinPriceInfo';

import './Coin.css'

import {fetchPriceData,options} from '../Data/data'

function Coin({Id,ImgURL,CoinTitle,coinDetails,coinPrice,removeCoin}){

    const [priceData,setPriceData]=useState(fetchPriceData()); 
    
    const getPriceData = async () => {
        const priceData = await fetchPriceData();
        setPriceData(priceData);
    };

    useEffect(()=>{
        getPriceData();
    },[]);

    return (
        <div className="Coin">
            <div className="Coin-heading">
                <CoinImage ImgURL={ImgURL}/>
                <CoinName CoinTitle={CoinTitle}/> 
            </div>
            <CoinDetailInfo coinDetails={coinDetails}/>
            <CoinPriceInfo coinPrice={coinPrice} data={priceData} options={options}/>
            <button type="button" className='btn btn-refresh' onClick={()=>{
                getPriceData();
            }}> Refresh </button>
            <button type="button" className='btn btn-delete' onClick={()=>{
                removeCoin(Id);
            }}> Delete </button>
        </div>
    );
}

export default Coin;