import React,{useState,useEffect,createContext } from 'react'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import axios from 'axios';
import {Navbar,HomePage,MarketPage,NewsPage,SignupPage,LoginPage,CryptoDetails,BuySellPage, Loader,Test,ProfilePage,NotFound} from './Components';
import './App.css';

// ToDo:: 1. add isError attribute to User useState
export const UserContext = createContext();

const AppTest = () => {
    const [User,setUser]=useState({data:undefined,isFetching:true});

    const getUser=()=>{
        setUser({
            data:{
                firstName:"Aayush",
                lastName:"Shandilya",
                emailId:"heyaayush.py@gmail.com",
            },
            isFetching:false,
        })
    }

    useEffect(()=>{
        let isComponentMounted = true;    
        if(isComponentMounted){
            getUser();
        }
        return () => {
            isComponentMounted = false;
        }
    },[]);

  return (
        <UserContext.Provider value={User}>
            <BrowserRouter basename='/'>
                {console.log("User in App.js",User)}
            {(User.isFetching)?(
                <Loader/>
            ):(
                <div className='app' style={{backgroundColor:"rgb(240,242,245)"}}>            
                    <div className="navbar">
                        <Navbar/>
                    </div>
                    <div className="main" >
                        <Layout>
                            <div className="routes">
                                    <Switch>
                                        <Route exact path="/">
                                            <HomePage/>
                                        </Route>
                                        <Route path="/Market">
                                            <MarketPage/>
                                        </Route>
                                        <Route path="/crypto/:coinId">
                                            <CryptoDetails />
                                        </Route>                                
                                        <Route path="/News">
                                            <NewsPage/>
                                        </Route>
                                        <Route path="/Signup">
                                            {(!User.data)?(<SignupPage/>):(<Redirect to='/'/>)}
                                        </Route>
                                        <Route path="/Login">
                                            {(!User.data)?(<LoginPage setUser={setUser}/>):(<Redirect to='/'/>)}
                                        </Route>
                                        <Route path="/BuySell">
                                            {(User.data)?(<BuySellPage/>):(<Redirect to='/Login'/>)}
                                        </Route>
                                        <Route path="/Profile">
                                            {(User.data)?(<ProfilePage/>):(<Redirect to='/Login'/>)}
                                        </Route>
                                        <Route path="/test">
                                            <Test/>
                                        </Route>
                                        <Route>
                                            <NotFound/>
                                        </Route>
                                    </Switch>
                            </div>
                        </Layout>
                    </div>
                </div>
            )}
            </BrowserRouter>
        </UserContext.Provider>

    )
}

export default AppTest;
