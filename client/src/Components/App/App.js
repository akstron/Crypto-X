import React,{useEffect, useState} from "react";
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import'./App.css'
import Header  from "../Header/Header";
import HomePage from "../Pages/HomePage"
import Market from "../Pages/Market";
import ProfilePage from "../Pages/ProfilePage"
import LoginPage from "../Pages/LoginPage"
import SignUpPage from "../Pages/SignUpPage"
import NotFound from "../Pages/NotFound";
import ValindationPage from "../Pages/ValindationPage";
import AddMoney from "../Pages/AddMoney";
import axios from 'axios';
// import io from 'socket.io-client'

// const socket=io(process.env.REACT_APP_BACKEND,{
//   transports:['websocket','polling']
// });

function App() {
    let newCryptoCoins=[
    {
        Id:1,
        ImgURL :"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",
        CoinTitle:'Bitcoin',
        CoinName:'bitcoin',
        CoinSymbol:'BTCUSDT',
        Currency:'usd',
        CoinDetails:'A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.',
        CurrentPrice:25701.50,
        CoinGrowth_24:0.51,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        Range:604800,
    },
    {
        Id:2,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",
        CoinTitle:'Ethereum',
        CoinName:'ethereum',
        CoinSymbol:'ETHUSDT',
        Currency:'usd',
        coinDetails:'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.',
        CurrentPrice:25701.50,
        CoinGrowth_24:-0.21,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        Range:604800,
    },
    {
        Id:3,
        ImgURL :"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",
        CoinTitle:'Dogecoin',
        CoinName:'dogecoin',
        CoinSymbol:'DOGEUSDT',
        Currency:'usd',
        CoinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',
        CurrentPrice:25701.50,
        CoinGrowth_24:0.1,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        Range:604800,
    },
    {
        Id:4,
        ImgURL :"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",
        CoinTitle:'Polkadot',
        CoinName:'polkadot',
        coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',
        coinPrice: 5907.53,
        CoinSymbol:'DOTUSDT',
        Currency:'usd',
        CurrentPrice:25701.50,
        CoinGrowth_24:-0.3,
        CoinPrices:{timeStamps:[],priceData:[]},
        CurrentPriceClose:0,
        CurrentPriceOpen:0,
        CurrentPriceHigh:0,
        CurrentPriceLow:0,
        
    }
]
  //TODO ::: Handle Error Cases
  const [User,setUser]=useState(undefined);
  const [data,setData]=useState(undefined);
  const [isLoading,setIsLoading]=useState(true);
  const [cryptoCoins,setCryptoCoins]=useState(newCryptoCoins);
  const [cryptoCoinsPrices,setCryptoCoinsPrices]=useState(undefined);

  const getUser=()=>{
    const userRoute = process.env.REACT_APP_BACKEND + '/getUser';
    axios.get(userRoute, {withCredentials: true}).then(res => {
      // console.log(res);
      if(res['data']['status']){
            const user=({firstName:res['data']['user']['firstName'],
                        lastName:res['data']['user']['lastName'],
                        emailId:res['data']['user']['email']});
            setUser(user)
            // console.log(user);
        }
      setIsLoading(false);
    }).catch(error => {
        console.log(error);
        setIsLoading(false);

    })
  }

  //ISSUE :: If Error occured in one coin element then return undefined and app will Crash

    

/*   useEffect(()=>{
    let isComponentMounted = true;
    getUser()
    const getCoinsData=async (coinsList)=>{
        const fetchData=async (cryptoCoin,cryptoCoins,index,range)=>{
          function convertToDate(unix_timestamp){
              let dateObj = new Date(unix_timestamp);
              let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              let year = dateObj.getFullYear();
              let month = months[dateObj.getMonth()];
              let date = dateObj.getDate();
              let time = date +' '+ month + ' ' + year ;
              return time;
          }
          let end=parseInt((new Date().getTime() / 1000).toFixed(0))
          let start=end-range;
          let URL='https://api.coingecko.com/api/v3/coins/'+cryptoCoin.CoinName+'/market_chart/range?vs_currency='+cryptoCoin.Currency+'&from='+start+'&to='+end;
          // console.log(URL)
          await fetch(URL)
              .then((resp)=>{
                  if(resp.status>=200 && resp.status<=299){
                      return resp.json();
                  }
              }).then((result)=>{
                  // console.log(result);
                  let timeStampArr = result["prices"].map((price)=>{
                      return convertToDate(price[0]);
                  })
                  let priceDataArr = result["prices"].map((price)=>{
                      return Math.round(price[1]);
                  })
                  let newCryptoCoins=cryptoCoins;
                  // let CoinPrices={timeStamps:timeStampArr,priceData:priceDataArr};
                  let CoinPrices={timeStamps:[],priceData:[]};
                  cryptoCoin.CoinPrices=CoinPrices;
                  newCryptoCoins[index]=cryptoCoin;
                  if(isComponentMounted) setCryptoCoins(newCryptoCoins)  
                  if(index===(cryptoCoins.length-1)) setIsLoading(false);                              
              }).catch((Error)=>{
                  console.log("Err::"+Error + index)
                  if(index===(cryptoCoins.length-1)) setIsLoading(false);
              });

      }
      for (let index = 0; index < coinsList.length; index++) {
        await fetchData(coinsList[index],newCryptoCoins,index,604800);
      }
    }
    getCoinsData(newCryptoCoins)
    // console.log("Length:"+newCryptoCoins.length);
    return () => {
      isComponentMounted = false;
    }
  },[]) */


  useEffect(()=>{
    let isComponentMounted = true;    

    getUser();
    /* socket.on('currentData',market=>{
      if(isComponentMounted) setData(market);//Change Fetch calls !!! -> LOGIC <-
      if(isComponentMounted) console.log(market.BTCUSDT.close)
      // if(isComponentMounted) setCryptoCoinsPrices(market.BTCUSDT.close);
      if(isComponentMounted && market.BTCUSDT!==undefined && market.BTCUSDT.close!==undefined) setCryptoCoins((cryptoCoins)=>{
        if(cryptoCoins.length<1)return cryptoCoins;
        let newCryptoCoins=cryptoCoins;
        let currentDate=new Date();
        let dateStr=currentDate.getHours().toString()+':'+currentDate.getMinutes().toString();
        newCryptoCoins[0].CurrentPrice=parseInt(market.BTCUSDT.close).toFixed(2);
        if(newCryptoCoins[0].CoinPrices.priceData.length>60){
          newCryptoCoins[0].CoinPrices.priceData.shift();
          newCryptoCoins[0].CoinPrices.timeStamps.shift();
        }
        newCryptoCoins[0].CoinPrices.priceData.push(market.BTCUSDT.close);
        newCryptoCoins[0].CoinPrices.timeStamps.push(dateStr);
        console.log(newCryptoCoins)
        return newCryptoCoins;
      });
      // if(isComponentMounted) console.log(cryptoCoins)
      // if(isComponentMounted) console.log({bitcoin:market['BTCUSDT'].high})
      // if(market['BTCUSDT'] && isComponentMounted) changePrice(0,market['BTCUSDT'].high)
      // if(isComponentMounted) console.log({bitcoin:market['BTCBUSD']['high'],
      //   dogecoin:market['DOGEUSDT']['high'],
      //   etheruem:market['ETHUSDT']['high'],
      //   poly:market['POLYUSDT']['high']})
    }) */

    return () => {
      isComponentMounted = false;
      setIsLoading(false);
    }
  },[])

  return (
    <>
    { isLoading===true?(<></>):(<>
        {console.log("Rendering")}
        {console.log(cryptoCoins)}
        <BrowserRouter basename='/'>
          <Header {...User} setUser={setUser}/>
          <h2>{cryptoCoinsPrices}</h2>
          <Switch>
            <Route path="/" exact><HomePage cryptoCoins={cryptoCoins}/></Route>
            <Route path="/Market"><Market cryptoCoinList={cryptoCoins}/></Route> 
            {/* Protected Route */}
            {console.log(User===undefined)}        
            {console.log(User)}        
            <Route path="/Profile">{!(User===undefined)?(<ProfilePage {...User}/>):(<Redirect to='/login'/>)}</Route>
            <Route path="/addMoney">{!(User===undefined)?(<AddMoney {...User}/>):(<Redirect to='/login'/>)}</Route>
            <Route path="/login"> {(User===undefined)?(<LoginPage setUser={setUser}/>):(<Redirect to='/'/>)} </Route>
            <Route path="/signup" > {(User===undefined)?(<SignUpPage setUser={setUser}/>):(<Redirect to='/'/>)} </Route> 
            <Route path="/validation/:emailId" component={ValindationPage}/>
            <Route component={NotFound }/>
          </Switch>
        </BrowserRouter>
      </>)}
    </>
    )
  }

export default App