import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  cleanUpAuthToken,
  testAuthGetter,
  getUserData,
  getUserInfo
} from '../services/strava'

export default function StravaRedirect(){

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      
      try {    
          // Save the Auth Token to the Store (it's located under 'search' for some reason)
          const stravaAuthToken = cleanUpAuthToken(location.search);
          //console.log(stravaAuthToken);          

          // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
          const tokens = await testAuthGetter(stravaAuthToken);
          //console.log(tokens)
          // this.props.setUser(tokens);
          const accessToken = tokens.access_token;
          const userID = tokens.athlete.id;

          // console.log(tokens);

          // // Axios request to get users info
          // const user = await getUserData(userID, accessToken)
          // const userInfo = await getUserInfo(accessToken)
          // console.log(userInfo)
          localStorage.setItem("accessToken", JSON.stringify(accessToken))
          
          navigate('/')
          // history.push("/yourdistance");
      } catch (error) {
          //history.push("/");
      }
    };
    authenticate();
  },[]);

  return <div>Loading</div>
}
