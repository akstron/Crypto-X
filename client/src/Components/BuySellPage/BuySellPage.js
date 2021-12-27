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

        const getCoinsDetails=(count)=>{
            const route = process.env.REACT_APP_BACKEND + '/getCoinDetails';
            axios.post(route, {count:count}).then(res => {
              console.log(res);  
              if(res['data']){
                    setCoinsData({
                        data:res.data.coins,
                        isFetching:false,
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        }

        if(isComponentMounted) {
          getCoinsDetails(100);
        }
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