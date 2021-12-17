import axios from 'axios';
import Header  from "../Header/Header";
import HomePage from "../Pages/HomePage"
import Market from "../Pages/Market";
import ProfilePage from "../Pages/ProfilePage"
import LoginPage from "../Pages/LoginPage"
import SignUpPage from "../Pages/SignUpPage"
import NotFound from "../Pages/NotFound";
import ValindationPage from "../Pages/ValindationPage";
import AddMoney from "../Pages/AddMoney";
import { allCoinsList, favCryptoCoins } from '../Utils/data';
import'./App.css'

import React,{useEffect, useState} from "react";
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import { TradePage } from '../TradePage/TradePage';

import io from 'socket.io-client'

const socket=io(process.env.REACT_APP_BACKEND,{
    transports:['websocket','polling']
});


function App() {

  //TODO ::: Handle Error Cases
  const [User,setUser]=useState(undefined);
  const [isLoading,setIsLoading]=useState(true);

  const [data,setData]=useState(undefined);

  const getUser=()=>{
    const userRoute = process.env.REACT_APP_BACKEND + '/getuser';

    axios.get(userRoute, {withCredentials: true}).then(res => {
      console.log("Response--");
      console.log(res);
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

  const socketConnect=()=>{
        // socket.on('currentData',market=>{
        //     // console.log(market)
        //     setData(market)
        //     if(market.symbol!==undefined) setCryptoCoins((cryptoCoins)=>{
        //         if(cryptoCoins.length<1)return cryptoCoins;
        //         let newCryptoCoins=cryptoCoins;
        //         let currentDate=new Date();
        //         let dateStr=currentDate.getHours().toString()+':'+currentDate.getMinutes().toString();
        //         for(let i=0;i<newCryptoCoins.length;i++){
        //             if(market.symbol===newCryptoCoins[i].CoinSymbol){
        //                 newCryptoCoins[i].CurrentPriceClose=Math.ceil(market['price']);
                    
        //                 if(newCryptoCoins[i].CoinPrices.priceData.length>100){
        //                     newCryptoCoins[i].CoinPrices.priceData.shift();
        //                     newCryptoCoins[i].CoinPrices.timeStamps.shift();
        //                 }
        //                 newCryptoCoins[i].CoinPrices.priceData.push(market['price']);
        //                 newCryptoCoins[i].CoinPrices.timeStamps.push(dateStr);
        //             }
        //         }
        //         // console.log(newCryptoCoins)
        //         return newCryptoCoins;
        //     });
        // });
    }

  useEffect(()=>{
    let isComponentMounted = true;    
    if(isComponentMounted){
      getUser();
      if(User){
        console.log(User.firstName);
      }
    }
    return () => {
      isComponentMounted = false;
      setIsLoading(false);
    }
  },[])

  return (
    <>
    { isLoading===true?(<>
        {/*TODO :: Add Spinner */}
      </>):(<>
        <BrowserRouter basename='/'>
          <Header {...User} setUser={setUser}/>
          <Switch>
            <Route path="/" exact ><HomePage cryptoCoins={favCryptoCoins}/></Route>
            <Route path="/Market"><Market cryptoCoinList={favCryptoCoins}/></Route> 
            {/* Protected Route */}       
            <Route path="/Profile">{!(User===undefined)?(<ProfilePage {...User}/>):(<Redirect to='/login'/>)}</Route>
            <Route path="/TradePage">{!(User===undefined)?(<TradePage {...User} allCoinsList={allCoinsList}/>):(<Redirect to='/login'/>)}</Route>
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