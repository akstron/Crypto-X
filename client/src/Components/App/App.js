import React from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import'./App.css'

import Header  from "../Header/Header";
import HomePage from "../Pages/HomePage"
import LoginPage from "../Pages/LoginPage"
import SignUpPage from "../Pages/SignUpPage"
import NotFound from "../Pages/NotFound";

function App() {
  return (
    <BrowserRouter basename='/'>
      <Header/>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={ LoginPage}/>
        <Route path="/signup" component={SignUpPage }/>
        <Route component={NotFound }/>
      </Switch>
    </BrowserRouter>
  )
}

export default App