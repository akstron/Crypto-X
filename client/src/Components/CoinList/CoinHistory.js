import { useEffect,useState } from 'react';
import Coin from '../CoinList/Coin';
import { updatePriceAPI } from '../Data/data';
import {BeatLoader} from 'react-spinners'

const CoinHistory = ({Id,ImgURL,CoinTitle,CoinName,CoinDetails,Currency,Range,CoinPrices,CurrentPriceClose,CurrentPriceOpen,CurrentPriceHigh,CurrentPriceLow,CoinGrowth_24,removeCoin}) => {

    const [isLoading,setLoading]=useState(true); 
    const [priceData,setPriceData]=useState({timeStamps:[],priceData:[]}); 
    const [isError,setError]=useState(false);

    const getPriceData = async(CoinName,Range,Currency) => {
       await updatePriceAPI(CoinName,Range,Currency,setPriceData,setLoading,setError)        
        // console.log("CoinPrices-Got Price Data --");
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
                <div className="Coin">
                    <BeatLoader size={24} loading color='hsl(205, 78%, 60%)'/>
                </div>
            ):(
                <>
                {console.log(priceData)}
                <div className="Coin">
                    {/* {console.log('Line - 49')} */}
                    {/* {console.log(priceData)} */}
                    <Coin Id={Id} ImgURL={ImgURL} CoinTitle={CoinTitle} CoinPrices={priceData} CoinName={CoinName} CoinDetails={CoinDetails} Currency={Currency} Range={Range} CurrentPriceClose={CurrentPriceClose} CurrentPriceOpen={CurrentPriceOpen} CurrentPriceHigh={CurrentPriceHigh} CurrentPriceLow={CurrentPriceLow} CoinGrowth_24={CoinGrowth_24} removeCoin />                </div>
            </>
            )}
        </>
    )
}

export default CoinHistory;