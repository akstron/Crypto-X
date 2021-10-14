import React,{useState} from 'react'
import './Login.css'

const Login = () =>{

    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log('Loging In '+{emailId}+' ...');
        // Add Login Logic
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
                <button type='submit'> Sign up</button>
            </form>
        </div>
    );

}

export default Login;