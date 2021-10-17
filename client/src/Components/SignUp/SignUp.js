import React,{useState} from 'react';
import axios from 'axios';
import './SignUp.css'
import { useHistory } from "react-router-dom";
import {Button} from 'react-bootstrap'

const SignUp = ({setUser}) =>{

    /*
        emailId -> email
    */
    const [userDetails,setUserDetails] = useState({
        firstName:"",lastName:"",email:"",password:""});

    const history = useHistory();

    const loginToHome=()=>{
        history.push('/')
    }

    const handleSubmit=(event)=>{
        event.preventDefault();        

        /**
         * TODO: Fill firsName and lastName in backend
         */

        const route = process.env.REACT_APP_BACKEND + '/signup';
        axios.post(route, userDetails, {withCredentials: true}).then(res => {
            console.log(res);
            if(res['data']['status']){
                setUser({firstName:userDetails.firstName,lastName:userDetails.lastName,emailId:userDetails.email});
                console.log({firstName:userDetails.firstName,lastName:userDetails.lastName,emailId:userDetails.email});
                loginToHome();
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handleChange=(event)=>{
        var name=event.target.name;
        var value=event.target.value;
        setUserDetails({...userDetails,[name]:value});
    }

    const [GAuth, setGAuth] = useState(false);

    const toggleGAuth = () => {
        setGAuth(!GAuth);
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <div className="form-control">
                    <label htmlFor="firstName">FirstName :</label>
                    <input 
                        type="firstName" 
                        id='firstName' 
                        name='firstName'
                        value={userDetails.firstName}
                        onChange={handleChange}/>
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">LastName :</label>
                    <input 
                        type="lastName" 
                        id='lastName' 
                        name='lastName'
                        value={userDetails.lastName}
                        onChange={handleChange}/>
                </div>                
                <div className="form-control">
                    <label htmlFor="email">Email :</label>
                    <input 
                        type="text" 
                        id='email' 
                        name='email'
                        value={userDetails.email}
                        onChange={handleChange}/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Passsword :</label>
                    <input 
                        type="password" 
                        id='passsword' 
                        name='password'
                        value={userDetails.password}
                        onChange={handleChange}
                    />
                </div>
                <Button variant="primary" type='submit'> Sign up</Button>
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
    );

}

export default SignUp;