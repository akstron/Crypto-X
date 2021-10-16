import React,{useState} from "react";
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

function App() {
  //Set/Fetch User Here ->
  //Better to store in local Storage
  const [User,setUser]=useState({uId:21505341,uName:'Aayush',emailId:'aayushshandilya80@gmail.com'});
  console.log(User)

  return (
    <BrowserRouter basename='/'>
      <Header {...User} setUser={setUser}/>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/Market" component={Market}/>
        {/* Protected Route */}
        <Route path="/Profile">{(User!==undefined)?(<ProfilePage {...User}/>):(<Redirect to='/login'/>)}</Route>
        <Route path="/login" component={ LoginPage} setUser={setUser}/>
        <Route path="/signup" component={SignUpPage} setUser={setUser}/>
        <Route path="/validation/:emailId" component={ValindationPage}/>
        <Route component={NotFound }/>
      </Switch>
    </BrowserRouter>
  )
}

export default App