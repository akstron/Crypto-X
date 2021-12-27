import axios from 'axios';
import CoinCard from "./CoinCard"
import Loader from '../Utils/Loader';
import { Typography,Row,Input} from 'antd';
import React,{useState,useEffect} from 'react'
import marketIcon from '../../Images/main-logo.png'

const {Title} =Typography

const MarketPage = ({simplified}) => {
    const count = simplified?5:25;
    const [cryptosList, setcryptosList] = useState({data:undefined,isFetching:true});
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        let isComponentMounted = true;

        const getCoinsDetails=(count)=>{
            const route = process.env.REACT_APP_BACKEND + '/getCoinDetails';
            axios.post(route, {count:count}).then(res => {
                if(res['data']){
                    setcryptosList({
                        data:res.data,
                        isFetching:false,
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        }

        if(isComponentMounted){
            getCoinsDetails(count)
        }

        return (() => {
            isComponentMounted = false;
        })

    },[count]);

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredData);   
    }, [cryptosList,searchTerm])
    
    return (
        <div>
            {(!simplified) && (
                <div className='home-heading-container'>                    
                        <Title level={2} className='home-title'>
                            <img src={ marketIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                              Top Crypto Coins
                        </Title>
                    <div  className="search-crypto">
                        <Input placeholder='search Coins' onChange={(event)=>setSearchTerm(event.target.value) }/>
                    </div>
                </div>
            )}

            {(cryptosList.isFetching)?(
                <Row className='loading-div'>
                    <Loader />
                </Row>
            ):(
                <Row gutter={[32,32]} className='crypto-card-container'>
                    {cryptos?.map((currency,id)=>(
                        <CoinCard currency={currency} id={id}/>
                    ))}
                </Row>
            )}
            
        </div>
    )
}

export default MarketPage
