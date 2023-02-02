import React, { useEffect, useState } from "react";
import { getActivitiesByDate } from "../services/strava";

const Buscador = () => {
  const access_token = JSON.parse(localStorage.getItem("accessToken"))
  console.log(access_token)
  const [desde, setDesde] = useState("")
  const [hasta, setHasta] = useState("")
  const [elevation, setElevation] = useState("")
  const [distance, setDistance] = useState(0)
  const [activities, setActivities] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDistance(0)
    setElevation(0)
    const activitiesResult = await getActivitiesByDate(access_token,toTimestamp(hasta), toTimestamp(desde))
    setActivities(activitiesResult)
    console.log(activitiesResult)
  }

  function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
  }

  useEffect(() => {
    let total = 0;
    let totalElev = 0;

    (activities.data) &&
      activities.data.map((act) => {
        if(act.type == 'Ride'){
          total = total + act.distance
          totalElev = totalElev + act.total_elevation_gain
        }
      })

    setDistance(total)
    setElevation(totalElev)

    //console.log('distance',distance)
  }, [activities])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Desde:
          <input 
            type="date" 
            value={desde}
            onChange={(e) => setDesde(e.target.value)} 
          />
        </label><br/>
        <label>
          Hasta:
          <input 
            type="date" 
            value={hasta}
            onChange={(e) => setHasta(e.target.value)} 
          />
        </label><br/>
        <input type="submit" value="Buscar" />
      </form>
      <h2>Desde: {desde} - Hasta: {hasta}</h2>
      <ol>
        {
            (activities.data) && activities.data.map((a) =>
            a.type == 'Ride' &&
            <li key={a.id}>
              {a.name} - {a.type} - {a.start_date} 
              - Distancia: {(a.distance/1000).toFixed(1)}
              - Elevacion: {(a.total_elevation_gain).toFixed(1)}
            </li>
            )
        }
      </ol>
      {(distance) && (
        <h4>Total distancia: {(distance/1000).toFixed(1)} KM</h4>
      )}
      {(elevation) && (
        <h4>Total Elevacion: {elevation.toFixed(1)} m</h4>
      )}
    </div>
  )
}

export default Buscador