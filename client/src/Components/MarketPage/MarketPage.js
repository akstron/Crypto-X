import axios from 'axios';
import CoinCard from "./CoinCard"
import Loader from '../Utils/Loader';
import { Typography,Row,Input} from 'antd';
import { AppSocketContext } from '../../App';
import React,{useState,useEffect,useContext} from 'react'
import marketIcon from '../../Images/main-logo.png'

const {Title} =Typography

const MarketPage = ({simplified}) => {
    const count = simplified?10:50;
    const [cryptosList, setcryptosList] = useState({data:undefined,isFetching:true});
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    const socket = useContext(AppSocketContext);

    useEffect(()=>{
        let isComponentMounted = true;

        const getCoinsDetailsAPI=(count)=>{
            const options = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/coins?limit='+count,
                headers: {
                    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                    'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
                }
            };

            axios.request(options).then(function (response) {
                setcryptosList({
                    data:response.data.data,
                    isFetching:false,
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
        if(isComponentMounted) getCoinsDetailsAPI(count);

        return (() => {
            isComponentMounted = false;
        })

    },[count]);

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredData);   
    }, [cryptosList,searchTerm])

    useEffect(()=>{

        let isComponentMounted = true;    

        const socketOrdersConnect=()=>{
            socket.on('currentData',(order)=>{
                console.log('current Data ... ', order);
            })
        }
        if(isComponentMounted){
            socketOrdersConnect();
        }
        return () => {
            isComponentMounted = false;
            socket.off('currentData');
        }

    },[socket])
    
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
