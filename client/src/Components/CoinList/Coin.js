import React,{useState,useEffect} from 'react'
import CoinImage from './CoinImage'
import CoinName from './CoinName'
import CoinDetailInfo from './CoinDetailInfo';
import CoinPriceInfo from './CoinPriceInfo';

import './Coin.css'
import {updatePriceData,options, fetchPriceData} from '../Data/data'
import {BeatLoader} from 'react-spinners'

function Coin({Id,ImgURL,CoinTitle,coinDetails,coinPrice,removeCoin}){

    const [isLoading,setLoading]=useState(true); 
    const [priceData,setPriceData]=useState(fetchPriceData); 
    const [isError,setError]=useState(false); 

    const getPriceData = async () => {
        const priceData = updatePriceData(setPriceData,setError);
        setPriceData(priceData);
    }

    useEffect(()=>{
        getPriceData()
            .then(()=>{
                setLoading(false);
            }).catch((error)=>{
                console.log(error)
                setError(true);
            });
    },[]);

    if(isLoading){
        return(
            <div className="Coin">
                <BeatLoader size={24} loading color='hsl(205, 78%, 60%)'/>
            </div>
        );
    }

    return (
        <div className="Coin">
            <div className="Coin-heading">
                <CoinImage ImgURL={ImgURL}/>
                <CoinName CoinTitle={CoinTitle}/> 
            </div>
            <CoinDetailInfo coinDetails={coinDetails}/>
            {/* setUp Seperate Error for Card fetching error */}
            {isError ? 
                <div className="Coin-Error">
                    {/* convert to img link might not work */}
                    <img src="https://cdn-icons-png.flaticon.com/512/4864/4864276.png" height='80px' alt="Error !"/>
                    <h3> Something Went Wrong ! </h3>
                </div>:
                <CoinPriceInfo coinPrice={coinPrice} data={priceData} options={options}/>
            }
            <button type="button" className='btn btn-refresh' onClick={()=>{
                updatePriceData(setPriceData,setError);
            }}> Refresh </button>
            <button type="button" className='btn btn-delete' onClick={()=>{
                removeCoin(Id);
            }}> Delete </button>
        </div>
    );
}

export default Coin;