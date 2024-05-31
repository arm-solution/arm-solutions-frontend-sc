import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import location from './../assets/icon/location.png'
import MarkerClusterGroup from 'react-leaflet-cluster';

const Map = () => {
// const position = [14.0371, 121.1109];
const bilucaoCoordinates = [14.0371, 121.1109];

const positions = [
{
    geocode: [14.0433, 121.1587],
    username: 'lance'
},
{
    geocode: [14.0371, 121.1109],
    username: 'jeck'
},
{
    geocode: [14.0355, 121.1223],
    username: 'mel'
},
]

const customIcon = new Icon({
    iconUrl: location,
    iconSize: [38, 38]
});


  return (
    <>
    <MapContainer center={bilucaoCoordinates} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
            { positions.map((marker) => (

            <Marker position={marker.geocode} icon={customIcon}>
            <Popup>
                You are loggedin in this position, {marker.username}
            </Popup>
            </Marker>
 
            ))}
        </MarkerClusterGroup>
    </MapContainer>,
    </>
  )
}

export default Map