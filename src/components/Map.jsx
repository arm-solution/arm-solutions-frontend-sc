import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import location from './../assets/icon/location.png';
import home from './../assets/icon/home.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import * as turf from '@turf/turf';

const Map = (props) => {
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
    {
      geocode: [14.0401, 121.1140],
      username: 'joseph'
    },
    {
      geocode: [14.0400, 121.1145],
      username: 'insideUser'
    },
    {
      geocode: [25.0964232, 55.17071],
      username: 'Lance Dubai'
    }
  ];

  const geofenceCoords = useMemo(() =>[
    [14.0385, 121.1130],
    [14.0385, 121.1150],
    [14.0415, 121.1150],
    [14.0415, 121.1130],
    [14.0385, 121.1130] 
  ])

  // Check if positions are inside the geofence
  const [positionsInsideGeofence, setPositionsInsideGeofence] = useState([]);
  useEffect(() => {
    const checkGeofence = () => {
      const polygon = turf.polygon([geofenceCoords]);
      const insidePositions = positions.map(position => {
        const point = turf.point(position.geocode);
        const inside = turf.booleanPointInPolygon(point, polygon);
        console.log(`Checking position: ${position.username}, inside geofence: ${inside}`);
        return {
          ...position,
          insideGeofence: inside
        };
      });
      setPositionsInsideGeofence(insidePositions);
    };
  
    checkGeofence();
  }, []);

  const customIcon = new Icon({
    iconUrl: location,
    iconSize: [38, 38]
  });

  const ArmSolIcon = new Icon({
    iconUrl: home,
    iconSize: [38, 38]
  });

  return (
    <div className='map-container'>
      <MapContainer center={bilucaoCoordinates} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Marker position={[14.0401, 121.1140]} icon={ArmSolIcon}>
            <Popup>
              <b>Arm Solution Enterprises</b><br />
              This position is inside the geofence.
            </Popup>
          </Marker>

          <Polygon positions={geofenceCoords} color="blue" />

          {positionsInsideGeofence.map((marker, index) => (
            <Marker position={marker.geocode} icon={customIcon} key={index}>
              <Popup>
                You are logged in at this position, {marker.username}<br />
                This position is {marker.insideGeofence ? 'inside' : 'outside'} the geofence.
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
