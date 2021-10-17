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
  //Set/Fetch User Here ->
  //Better to store in local Storage
  const [User,setUser]=useState();
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
    }).catch(error => {
        console.log(error);
    })
  }
  useEffect(()=>{getUser()},[])

  return (
    <BrowserRouter basename='/'>
      <Header {...User} setUser={setUser}/>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/Market" component={Market}/>
        {/* Protected Route */}
        <Route path="/Profile">{(User!==undefined)?(<ProfilePage {...User}/>):(<Redirect to='/login'/>)}</Route>
        <Route path="/addMoney">{(User!==undefined)?(<AddMoney {...User}/>):(<Redirect to='/login'/>)}</Route>
        <Route path="/login" component={()=><LoginPage setUser={setUser}/>}/>
        {console.log(setUser)}        
        <Route path="/signup" component={()=><SignUpPage setUser={setUser}/>} />
        <Route path="/validation/:emailId" component={ValindationPage}/>
        <Route component={NotFound }/>
      </Switch>
    </BrowserRouter>
  )
}

export default App