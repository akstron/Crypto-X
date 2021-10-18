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

function App() {

  //TODO ::: Handle Error Cases
  //Set/Fetch User Here ->
  //Better to store in local Storage
  const [User,setUser]=useState();
  const [isLoading,setIsLoading]=useState(true);
  const getUser=()=>{
    const userRoute = process.env.REACT_APP_BACKEND + '/getUser';
    axios.get(userRoute, {withCredentials: true}).then(res => {
      console.log(res);
      if(res['data']['status']){
            const user=({firstName:res['data']['user']['firstName'],
                        lastName:res['data']['user']['lastName'],
                        emailId:res['data']['user']['email']});
            setUser(user)
            console.log(user);
        }
        setIsLoading(false);

    }).catch(error => {
        console.log(error);
        setIsLoading(false);

    })
  }
  useEffect(()=>{getUser()},[])

  return (
    <>
    { isLoading===true?(<></>):(<>
        {console.log(User)}
        <BrowserRouter basename='/'>
          <Header {...User} setUser={setUser}/>
          <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/Market" component={Market}/>
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