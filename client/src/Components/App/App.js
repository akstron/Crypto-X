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
import { favCryptoCoins } from '../Utils/data';
import'./App.css'

import React,{useEffect, useState} from "react";
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'

function App() {

  //TODO ::: Handle Error Cases
  const [User,setUser]=useState(undefined);
  const [isLoading,setIsLoading]=useState(true);

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

  useEffect(()=>{
    let isComponentMounted = true;    
    if(isComponentMounted) getUser();
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