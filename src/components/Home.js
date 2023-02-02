import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {
  getUserInfo,
  getActivities
} from '../services/strava'
import { setUser } from '../redux/actions/userActions';

export default function Home(){
  const [userInfo, setUserInfo] = useState();
  const [activities, setActivities] = useState([]);

  const user = useSelector((state) => state.user.users)
  const dispatch = useDispatch()
  const access_token = JSON.parse(localStorage.getItem("accessToken"))

  //console.log("lin 14: ", user)
  //let id = null
  const { id, firstname } = (user)? user : {}

  //const user = useSelector((state) => state.users.users[0])
  const authenticate = async () => {
    try { 
      const userInfo = await getUserInfo(access_token)
      const activities = await getActivities(access_token)
      setUserInfo(userInfo)
      dispatch(setUser(userInfo.data));
      setActivities(activities)
    } catch (error) {
      //history.push("/");
    }
  }

  useEffect(() => {
    authenticate()
  },[]);

  
  return (
    <div>
      {console.log('Bajo: ',activities)}
      <h1>Hi, {(userInfo)? userInfo.data.firstname: ''}  {(userInfo)? userInfo.data.lastname: ''}</h1> 
      <ul>
      {
          (activities.data) && activities.data.map((a) =>
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
      {/* {console.log('Bajo: ',user)} */}
      {(!user) ? (
        <div>... Loading</div>
      ):(
        <h2>{firstname} - ID: {id}</h2>  
      )}
    </div>
  ) 
}