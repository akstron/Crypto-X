import React from "react";
import SignUp from "../SignUp/SignUp";

function SignUpPage({setUser}) {
  return (
    <div className='container'>
        {console.log(setUser)}
        <SignUp setUser={setUser}/>
    </div>
  )
}

export default SignUpPage;