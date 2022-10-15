import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {
  getActivity
} from '../services/strava'


const segementos = ['Inici Tibidabo','BCN - Quiron-Vallcarca','TIBIDABO HILL CLIMB 2014','Escalada Tibidabo']

export default function Activity(){
  let { id } = useParams()
  const [ activity, setActivity ] = useState();

  useEffect(() => {
    const authenticate = async () => {
      try { 
        const access_token = JSON.parse(localStorage.getItem("accessToken"))
        const act = await getActivity(access_token, id)
        setActivity(act)
        console.log(act)
      } catch (error) {
        //history.push("/");
      }
    }
    authenticate()
  },[]);

  return (
    <div>
      <h1>Activity ID: {id}</h1>
      {activity &&
        <h2>
          {activity.data.name}
        </h2>
      }
      {activity &&
        <div>
          <h3>Segmentos:</h3>
          <ul>
          {activity.data.segment_efforts.map((a) =>
                <li key={a.id}>
                  {a.name} {segementos.find((s)=>{ return s == a.name }) && ' => Puerto cazado! 🚵🏽‍♂️'}
                </li>
                )
          } 
          </ul>
        </div>
      }
    </div>
  )
}
