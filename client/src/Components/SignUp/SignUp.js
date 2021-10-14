import React,{useState} from 'react';
import axios from 'axios';
import './SignUp.css'

const SignUp = () =>{

    /*
        emailId -> email
    */
    const [userDetails,setUserDetails] = useState({
        firstName:"",lastName:"",email:"",password:""});

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(userDetails);

        /**
         * TODO: Fill firsName and lastName in backend
         */

        const route = process.env.REACT_APP_BACKEND + '/signup';
        axios.post(route, userDetails, {withCredentials: true}).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
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
                <button type='submit'> Sign up</button>
            </form>
        </div>
    );

}

export default SignUp;