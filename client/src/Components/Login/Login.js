import axios from 'axios';
// import { copyFileSync } from 'fs';
import React,{useState} from 'react'
import './Login.css'
import { useHistory } from "react-router-dom";
import {Button} from 'react-bootstrap'

const Login = ({setUser}) =>{

    const history = useHistory();

    const loginToHome=()=>{
        history.push('/')
    }


    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [GAuth, setGAuth] = useState(false);

    const toggleGAuth = () => {
        setGAuth(!GAuth);
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(emailId);
        // Check for valid Email and Password
        // Add Login Logic
        // Redirect to Dashboard

        const route = process.env.REACT_APP_BACKEND + '/login';
        axios.post(route, {
            email: emailId, 
            password
        }, {withCredentials: true}).then(res => {
            console.log(res);
            if(res['data']['status']){
                const user=({firstName:res['data']['user']['firstName'],
                            lastName:res['data']['user']['lastName'],
                            emailId:res['data']['user']['email']});
                setUser(user)
                console.log(user);
                loginToHome();
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-control">
                    <label htmlFor="email">Email :</label>
                    <input 
                        type="email" 
                        id='email' 
                        name='email'
                        value={emailId}
                        onChange={((event)=>{setEmailId(event.target.value)})}/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">passsword :</label>
                    <input 
                        type="password" 
                        id='passsword' 
                        name='password'
                        value={password}
                        onChange={((event)=>{setPassword(event.target.value)})}
                    />
                </div>
                <Button variant="primary" type='submit'> Login </Button>
                <Button variant="dark" className='google-btn' onClick={toggleGAuth}> Sign in with <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="G" height='20px'/> </Button>{' '}

            </form>

            {GAuth ? (
                <div className="hidden">
                {window.location.href=process.env.REACT_APP_BACKEND + '/login/google'}
                </div>
            ):(
                <></>
            )}
        </div>
        //TODO :: Add Already have account ? Sign Up
    );

}

export default Login;