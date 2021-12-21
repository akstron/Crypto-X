import React,{useState,useEffect} from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography,Card,Row,Col,Input} from 'antd';
import marketIcon from '../../Images/main-logo.png'
import {FallOutlined,RiseOutlined} from '@ant-design/icons';
import Loader from '../Utils/Loader';
import axios from 'axios';

const {Title} =Typography

const MarketPage = ({simplified}) => {
    const count = simplified?10:50;
    const [cryptosList, setcryptosList] = useState({data:undefined,isFetching:true});
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

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
                        <Col key={id} xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card
                                    style={{borderRadius:"2rem"}}
                                    title={`${currency.rank}. ${currency.name}`}
                                    extra={<img className='crypto-image' alt='img' src={currency.iconUrl}/>}
                                    hoverable
                                >
                                    <p>Price : $ {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>DailyChange : {millify(currency.change)} % {(currency.change < 0)?(<FallOutlined style={{color: "red"}} />):(<RiseOutlined style={{color: "green"}} />)}</p>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
            
        </div>
    )
}

export default MarketPage
