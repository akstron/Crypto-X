import { useEffect,useState } from 'react';
import Coin from '../CoinList/Coin';
import { updatePriceAPI } from '../Utils/utils';
import {BeatLoader} from 'react-spinners'

const CoinHistory = ({Id,ImgURL,CoinTitle,CoinName,CoinDetails,Currency,Range,CurrentPriceClose,CurrentPriceOpen,CurrentPriceHigh,CurrentPriceLow,CoinGrowth_24}) => {

    const [isLoading,setLoading]=useState(true); 
    const [priceData,setPriceData]=useState({timeStamps:[],priceData:[]}); 
    const [isError,setError]=useState(false);

    const getPriceData = async(CoinName,Range,Currency) => {
       await updatePriceAPI(CoinName,Range,Currency,setPriceData,setLoading,setError)        
    }

    useEffect(()=>{
        let isComponentMount=true;
        if(isComponentMount) getPriceData(CoinName,Range,Currency).catch((error)=>{
                console.log(error)
                setError(true); 
            })
        return (()=>{isComponentMount=false})
    },[CoinName,Range,Currency]);

    return (
        <>
            {(isLoading)?(
                    <div className="Coin container">
                        <BeatLoader size={24} loading color='hsl(205, 78%, 60%)'/>
                    </div>
                ):(
                <>
                    <div className="Coin">
                        <Coin Id={Id} 
                                ImgURL={ImgURL} CoinTitle={CoinTitle} 
                                CoinPrices={priceData} CoinName={CoinName} 
                                CoinDetails={CoinDetails} Currency={Currency} 
                                Range={Range} CurrentPriceClose={CurrentPriceClose} 
                                CurrentPriceOpen={CurrentPriceOpen} 
                                CurrentPriceHigh={CurrentPriceHigh} 
                                CurrentPriceLow={CurrentPriceLow} 
                                CoinGrowth_24={CoinGrowth_24} />                
                    </div>
            </>
            )}
        </>
    )
}

export default CoinHistory;