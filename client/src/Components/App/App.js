// import React,{useState} from "react";
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
  const logedIn=false;
  // const [logedIn,setIsLogedIn]=useState(false);
  // setIsLogedIn(false);

  return (
    <BrowserRouter basename='/'>
      <Header User='aayush'/>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/Market" component={Market}/>
        {/* Protected Route */}
        <Route path="/Profile">{(logedIn?(<ProfilePage/>):(<Redirect to='/login'/>))}</Route>
        <Route path="/login" component={ LoginPage}/>
        <Route path="/signup" component={SignUpPage }/>
        <Route path="/validation/:emailId" component={ValindationPage}/>
        <Route component={NotFound }/>
      </Switch>
    </BrowserRouter>
  )
}

export default App