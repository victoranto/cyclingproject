import React, { useEffect, useState }  from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet';
import L from "leaflet";

function GetIcon( _iconSize ) {
  return L.icon({
    iconUrl: require('../static/img/icon.png'),
    iconSize: [_iconSize]
  })
}

export default function MapSegments(){
  const [ cords, setCords ] = useState();
  const segmentsLocation = [
    {"name": "Montjuic", "position": [41.363448638719234, 2.1649916226218133]},
    {"name": "Tibidabo", "position": [41.422145588220715, 2.1194442827289928]}
  ]

  useEffect(() => {
    if(!cords){
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        let c = [position.coords.latitude, position.coords.longitude];
        setCords(c);
      });
    }
  },[cords]);

  return (
    <div>
      <h1>Map Segements</h1>
      {cords &&
        <MapContainer center={cords} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          { segmentsLocation.map((location) => (
            <Marker position={location.position} icon={GetIcon( 30 )} >
              <Popup>
                {location.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      }
    </div>
  )
}