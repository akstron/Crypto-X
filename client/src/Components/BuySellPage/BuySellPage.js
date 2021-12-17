import { Steps, Button, message,Popover} from 'antd';
import React,{useState,useEffect}from 'react'
import Login from '../LoginPage/LoginPage.jsx'
import CoinTable from './CoinTable';
import axios from 'axios';

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
      content: <Login/>,
    },
    {
      title: 'Place Order',
      content: <Login/>,
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
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
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