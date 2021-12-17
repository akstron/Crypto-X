import { Typography,Steps, Button, message} from 'antd';
import React,{useState,useEffect}from 'react'
import buyIcon from '../../Images/buy-logo.png'
import CoinSummary from './CoinSummary'
import CoinTable from './CoinTable';
import axios from 'axios';

const {Title} =Typography

const BuySellPage = () => {

  const [current, setCurrent] = useState(0);
  const [coinsData,setCoinsData] = useState({data:undefined,isFetching:true});
  const [selectedCoin,setSelectedCoin]=useState(undefined);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { Step } = Steps;

  const steps = [
    {
      title: 'Select Coin',
      content: <CoinTable style={{margin:".5rem"}} data={coinsData} setCoin={setSelectedCoin}/>,
    },
    {
      title: 'Choose Sell/Buy',
      content: <CoinSummary coin={selectedCoin}/>,
    },
    {
      title: 'Place Order',
      content: <CoinSummary coin={selectedCoin}/>,
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
      <div className="steps-action" style={{margin:".5rem auto",textAlign: "center",padding:".5rem"}}>
        {current < steps.length - 1 && (
          (current==0 && !selectedCoin)?(
            <>
                <Button type="danger" onClick={() => {
                  message.error('Select a coin first !',1);
                }}>Next</Button>
            </>
          ):(
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default BuySellPage;