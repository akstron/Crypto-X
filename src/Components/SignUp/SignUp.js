import React,{useState} from 'react'
import './SignUp.css'

const SignUp = () =>{

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(emailId);
        // Check for valid Email and Password
        // Add SignUp Logic
        // Redirect to Dashboard
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
                        value={firstName}
                        onChange={((event)=>{setFirstName(event.target.value)})}/>
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">LastName :</label>
                    <input 
                        type="lastName" 
                        id='lastName' 
                        name='lastName'
                        value={lastName}
                        onChange={((event)=>{setLastName(event.target.value)})}/>
                </div>                
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

export default SignUp;