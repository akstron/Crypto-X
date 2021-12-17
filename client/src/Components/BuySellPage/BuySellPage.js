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

  //Test Mode ::
  const testCoin={
    "id": 14,
    "uuid": "WcwrkfNI4FUAe",
    "slug": "binancecoin-bnb",
    "symbol": "BNB",
    "name": "Binance Coin",
    "description": "<p>Binance Coin (BNB) is used for trading on the <a href=\"https://www.binance.com/?ref=35424440\" rel=\"nofollow noopener\" target=\"_blank\">Binance exchange</a>. When using Binance Coin you will receive a discount on the fees you need to pay. Binance aims to create a Decentralized Exchange (DEX) where Binance coin will function as the underlying token. Binance Coin is built on the Ethereum blockchain.</p>\n\n<h3>The goal of Binance Coin</h3>\n\n<p>Binance Coin was initially created as a utility token that allows users to pay for trading fees at a discounted rate on the <a href=\"https://www.binance.com/?ref=35424440\" rel=\"nofollow noopener\" target=\"_blank\">Binance exchange</a>. This trading fee discount offered by the token during Binance&rsquo;s first year, was the first of many use cases of Binance Coin that has grown Binance&rsquo;s global ecosystem. Since the start, Binance Coin has increasingly developed its functions and use cases. It became one of the most widely-used utility tokens in the blockchain space. Binance Coin can also be used to pay for travel costs, like flight and hotel bookings, buying virtual gifts, and using a credit card.</p>\n\n<h3>Who started Binance Coin</h3>\n\n<p>In 2017, Binance Coin was launched by Binance. It was first issued and launched during an Initial Coin Offering (ICO) crowdfunding event. Changpeng Zhao, who goes by CZ, is the founder and CEO of Binance. <a href=\"https://www.binance.com/?ref=35424440\" rel=\"nofollow noopener\" target=\"_blank\">Binance</a> is headquartered in Tokyo, Japan.</p>\n\n<p>More information&nbsp;on <a href=\"https://www.binance.com/?ref=35424440\" rel=\"nofollow noopener\" target=\"_blank\">binance.com</a></p>\n",
    "color": "#e8b342",
    "iconType": "vector",
    "iconUrl": "https://cdn.coinranking.com/B1N19L_dZ/bnb.svg",
    "websiteUrl": "https://www.binance.com/?ref=35424440",
    "socials": [],
    "links": [
        {
            "name": "binance.com",
            "url": "https://www.binance.com/?ref=35424440",
            "type": "website"
        },
        {
            "name": "binance",
            "url": "https://www.facebook.com/binance",
            "type": "facebook"
        },
        {
            "name": "Binance",
            "url": "https://www.instagram.com/Binance/",
            "type": "instagram"
        },
        {
            "name": "binance",
            "url": "https://www.reddit.com/r/binance",
            "type": "reddit"
        },
        {
            "name": "BinanceExchange",
            "url": "https://t.me/BinanceExchange",
            "type": "telegram"
        },
        {
            "name": "BinanceChinese",
            "url": "https://t.me/BinanceChinese",
            "type": "telegram"
        },
        {
            "name": "binance_announcements",
            "url": "https://t.me/binance_announcements",
            "type": "telegram"
        },
        {
            "name": "binance",
            "url": "https://twitter.com/binance",
            "type": "twitter"
        }
    ],
    "confirmedSupply": true,
    "numberOfMarkets": 1916,
    "numberOfExchanges": 132,
    "type": "coin",
    "volume": 1381435254,
    "marketCap": 78370317460,
    "price": "521.2883769328",
    "circulatingSupply": 150339660.2106263,
    "totalSupply": 166801147.9,
    "approvedSupply": true,
    "firstSeen": 1503014400000,
    "listedAt": 1503014400,
    "change": -3.55,
    "rank": 3,
    "history": [
        "540.4879379097",
        "538.9583338569",
        "540.3046959741",
        "540.2265012694",
        "538.8772180296",
        "535.6846469532",
        "534.2328381047",
        "535.1356718659",
        "532.8954713994",
        "531.6127494344",
        "531.1924552518",
        "531.2098986357",
        "530.9694349997",
        "529.9142025127",
        "531.0708163073",
        "533.194932254",
        "532.5080489672",
        "530.3556091217",
        "524.653294896",
        "529.3510614904",
        "528.5277481079",
        "528.8530842154",
        "528.3335975234",
        "527.0484583869",
        "530.1085046256",
        "526.6754669041",
        "521.2883769328"
    ],
    "allTimeHigh": {
        "price": "673.0027692783535",
        "timestamp": 1620604800000
    },
    "penalty": false
}


  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { Step } = Steps;

  const steps = [
    // {
    //   title: 'Select Coin',
    //   content: <CoinTable style={{margin:".5rem"}} data={coinsData} setCoin={setSelectedCoin}/>,
    // },
    {
      title: 'Choose Sell/Buy',
      content: <CoinSummary coin={testCoin}/>,
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