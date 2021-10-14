import React,{useState} from 'react'
import './SignUp.css'

const SignUp = () =>{

    const [userDetails,setUserDetails] = useState({
        firstName:"",lastName:"",emailId:"",password:""});

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(userDetails);
        // Check for valid Email and Password
        // Add SignUp Logic
        // Redirect to Dashboard
    }

    const handleChange=(event)=>{
        var name=event.target.name;
        var value=event.target.value;
        setUserDetails({...userDetails,[name]:value});
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
                        name='emailId'
                        value={userDetails.emailId}
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
                <button type='submit'> Sign up</button>
            </form>
        </div>
    );

}

export default SignUp;