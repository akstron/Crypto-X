import React from "react";
import Login from "../Login/Login";

function LoginPage({setUser}) {
  return (
    <div className='container'>
        <Login setUser={setUser}/>
    </div>
  )
}

export default LoginPage