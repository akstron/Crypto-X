import React,{useState,useEffect,createContext } from 'react'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import axios from 'axios';
import {Navbar,HomePage,MarketPage,NewsPage,SignupPage,LoginPage,CryptoDetails,
            BuySellPage, Loader,Test,ProfilePage,OTPPage,BankOptions ,NotFound,
            PortfolioPage,AboutUsPage} from './Components';
import './App.css';
import swRegister from './ServiceWorker/swRegister'

import io from 'socket.io-client'

// ToDo:: 1. add isError attribute to User useState
export const UserContext = createContext();
export const AppSocketContext=createContext();


const App = () => {

    const [User,setUser]=useState({data:undefined,isFetching:true});
    const [socket,setSocket]=useState(undefined);

    useEffect(()=>{
        let isComponentMounted = true;    

        const socketConnect= (user)=> {
            if(isComponentMounted && user){
                setSocket(io(process.env.REACT_APP_BACKEND,{
                    transports:['websocket','polling'],
                    upgrade: false,
                    query: {
                        userId: user?._id
                    },
                }))
            }else{
                console.log("User in Socket ::",user)
                setSocket(io(process.env.REACT_APP_BACKEND,{
                    transports:['websocket','polling'],
                    upgrade: false,
                    query: {
                        userId: undefined
                    },
                }))
            };
        }

        const getUser=()=>{
            const userRoute = process.env.REACT_APP_BACKEND + '/getuser';
            
            axios.get(userRoute, {withCredentials: true}).then(res => {
                if(res['data']['status']){
                    const user=(res['data']['user']);
                    socketConnect(user);
                    setUser({
                        data:user,
                        isFetching:false
                    });
                    swRegister();
                }else{
                    socketConnect(undefined);
                }
            }).catch(error => {
                console.log(error);
                socketConnect(undefined);
                setUser({
                    data:undefined,
                    isFetching:false
                });
            })

        }
        
        if(isComponentMounted){
            getUser();
        }
        return () => {
            isComponentMounted = false;
        }
    },[]);

    useEffect(() => {
        return () => {
            if(socket) socket.emit('Disconnect');
        }
    }, [socket])

  return (
        <UserContext.Provider value={User}>
            <AppSocketContext.Provider value={socket}>
                <BrowserRouter basename='/'>
                {(User.isFetching)?(
                    <Loader/>
                ):(
                    <div className='app' style={{backgroundColor:"rgb(240,242,245)"}}>       
                        <div className="navbar">
                            <Navbar/>
                        </div>
                        <div className="main" >
                            <Layout >
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
                                            <Route path="/Portfolio">
                                                {(User.data)?(<PortfolioPage/>):(<Redirect to='/Login'/>)}
                                            </Route>
                                            <Route path="/BankOptions">
                                                {(User.data)?(<BankOptions/>):(<Redirect to='/Login'/>)}
                                            </Route>
                                            <Route path="/OTP/:emailId">
                                                <OTPPage/>
                                            </Route>
                                            <Route path="/AboutUs">
                                                <AboutUsPage/>
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
            </AppSocketContext.Provider>
        </UserContext.Provider>

    )
}

export default App;
