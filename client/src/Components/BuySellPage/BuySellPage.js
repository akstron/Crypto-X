import React,{useState,useEffect}from 'react'
import { useLocation } from 'react-router-dom';

import { Typography,Steps} from 'antd';
import buyIcon from '../../Images/buy-logo.png'
import CoinSummary from './CoinSummary'
import CoinTable from './CoinTable';
import OrderCard from './OrderCard';

import axios from 'axios';

const {Title} =Typography

const BuySellPage = (props) => {
  
  const query = new URLSearchParams(useLocation().search);

  const [parameters,setParameters]=useState({
    selectedCoin:query.get("selectedCoin"),
    orderId:query.get("orderId"),
    orderType:query.get("orderType"),
    coinPrice:query.get("coinPrice"),
    coinQuantity:query.get("coinQuantity"),
    completed:query.get("completed")
  })

  const [current, setCurrent] = useState(0);
  const [coinsData,setCoinsData] = useState({data:undefined,isFetching:true});
  const [selectedCoin,setSelectedCoin]=useState(undefined);
  const [orderDetails,setOrderDetails]=useState(undefined);

  const next = () => {
    setCurrent(current + 1);
  };

  const { Step } = Steps;

  const steps = [
    {
      title: 'Select Coin',
      content: <CoinTable style={{margin:".5rem"}} data={coinsData} setCoin={setSelectedCoin} next={next}/>,
    },
    {
      title: 'Choose Sell/Buy',
      content: <CoinSummary coin={selectedCoin} next={next} setOrderDetails={setOrderDetails}/>,
    },
    {
      title: 'Order Details',
      content: <OrderCard order={orderDetails}/>,
    },
  ];

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
                setCoinsData({
                    data:response.data.data.coins,
                    isFetching:false,
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
        if(isComponentMounted) getCoinsDetailsAPI(100);
        return (() => {
            isComponentMounted = false;
        })
    },[]);

    useEffect(()=>{
      if(parameters.orderId!==null){
        setOrderDetails({
          orderId:parameters.orderId,
          coinType:parameters.selectedCoin,
          quantity:parameters.coinQuantity,
          price:parameters.coinPrice,
          orderType:parameters.orderType,
          completed:parameters.completed,
        })
        setCurrent(2);
      }else if(!coinsData.isFetching){
        if(parameters.selectedCoin!==null){
          const coin=coinsData.data.filter((coin)=>(coin.symbol===parameters.selectedCoin));
          if(coin.length>0) setSelectedCoin(coin[0]);
            setCurrent(1);
          }
        }
    },[parameters,coinsData])

  return (
    <>
      <Title level={3} style={{margin:".5rem",padding:".5rem"}}><img className='login-image' alt='img' src={buyIcon} height={'35px'} /> Buy / Sell  Coins </Title>
      <hr/>
      <Steps current={current} style={{margin:".5rem"}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <hr/>
      <div className="steps-content">{steps[current].content}</div>
    </>
  );
};
export default BuySellPage;