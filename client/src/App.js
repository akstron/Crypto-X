import React,{useState,useEffect,createContext } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import axios from 'axios';
import {Navbar,HomePage,MarketPage,NewsPage,SignupPage,LoginPage,CryptoDetails,BuySellPage, Loader} from './Components';
import './App.css';


// ToDo:: 1. add isError attribute to User useState
export const UserContext = createContext();

const App = () => {
    const [User,setUser]=useState({data:undefined,isFetching:true});

    const getUser=()=>{
        const userRoute = process.env.REACT_APP_BACKEND + '/getuser';

        axios.get(userRoute, {withCredentials: true}).then(res => {
        if(res['data']['status']){
                const user=({firstName:res['data']['user']['firstName'],
                            lastName:res['data']['user']['lastName'],
                            emailId:res['data']['user']['email']});
                setUser({
                    data:user,
                    isFetching:false
                });
            }
        }).catch(error => {
            console.log(error);
            setUser({
                data:undefined,
                isFetching:false
            });
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
                                        <Route exact path="/crypto/:coinId">
                                            <CryptoDetails />
                                        </Route>                                
                                        <Route path="/News">
                                            <NewsPage/>
                                        </Route>
                                        <Route path="/Signup">
                                            {(!User.data)?(<SignupPage/>):(<Redirect to='/'/>)}
                                        </Route>
                                        <Route path="/Login">
                                            {(!User.data)?(<LoginPage/>):(<Redirect to='/'/>)}
                                        </Route>
                                        <Route path="/BuySell">
                                            {(User.data)?(<BuySellPage/>):(<Redirect to='/Login'/>)}
                                        </Route>
                                    </Switch>
                            </div>
                        </Layout>
                    </div>
                </div>
            )}
            
        </UserContext.Provider>

    )
}

export default App;
