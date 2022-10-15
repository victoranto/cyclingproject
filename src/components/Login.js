import React from 'react';

const { REACT_APP_CLIENT_ID, REDIRECT_URL } = process.env

export default function Login(){
  
  const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}/?approval_prompt=force&scope=activity:read_all`;
  };


  return (
    <div>
      <h1>Strava Login</h1>
      <button onClick={handleLogin}>Login Strava</button> 
    </div>
  )
}