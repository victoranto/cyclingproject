import React from 'react';
//import { useNavigate } from 'react-router-dom'
const { REACT_APP_CLIENT_ID } = process.env
const redirectUrl = "http://localhost:3000/redirect"

export default function Login(){
  //const navigate = useNavigate()
  
  // const handleButton = () => {
  //   navigate('/' )
  // }
  const handleLogin = () => {
    //window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=activity:read_all`;
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/?approval_prompt=force&scope=activity:read_all`;
  };


  return (
    <div>
      <h1>Strava Login</h1>
      <button onClick={handleLogin}>Login Strava</button> 
    </div>
  )
}