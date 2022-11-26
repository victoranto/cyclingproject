import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  getUserInfo,
  getActivities
} from '../services/strava'

export default function Home(){
  const [userInfo, setUserInfo] = useState();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const authenticate = async () => {
      try { 
        const access_token = JSON.parse(localStorage.getItem("accessToken"))
        console.log(access_token)
        const userInfo = await getUserInfo(access_token)
        const activities = await getActivities(access_token)
        setUserInfo(userInfo)
        console.log(userInfo.data)
        console.log(activities)
        setActivities(activities.data)
      } catch (error) {
        //history.push("/");
      }
    }
    authenticate()
  },[]);

  
  //const userData = getUserData(access_token)
  

  return (
    <div>
      <h1>Hi, {(userInfo)? userInfo.data.firstname: ''}  {(userInfo)? userInfo.data.lastname: ''}</h1>
      <ul>
      {
          activities.map((a) =>
           a.type == 'Ride' &&
           <li key={a.id}>
            {a.name} - {a.type}
            <NavLink
              to={`/activity/${a.id}`}
              key={a.id}
            >
              {a.name}
            </NavLink>
           </li>
          )
      }
      </ul>
      
    </div>
  ) 
}