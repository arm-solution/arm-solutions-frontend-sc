import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import locationImg from './../assets/icon/location.png';
import { useLocation } from 'react-router-dom';
import home from './../assets/icon/home.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import * as turf from '@turf/turf';

const Map = (props) => {
  const bilucaoCoordinates = [14.0371, 121.1109];

  const myLocation = useLocation();

  // armsol area
  const geofenceCoords = useMemo(() =>[
    [14.0385, 121.1130],
    [14.0385, 121.1150],
    [14.0415, 121.1150],
    [14.0415, 121.1130],
    [14.0385, 121.1130] 
  ])

  // Check if positions are inside the geofence
  const [positionsInsideGeofence, setPositionsInsideGeofence] = useState(null);
  useEffect(() => {
    const checkGeofence = () => {

      const queryParams = new URLSearchParams(myLocation.search);
      const data = JSON.parse(decodeURIComponent(queryParams.get('data')));

      const polygon = turf.polygon([geofenceCoords]);

      // Position is now a single object instead of an array
      const point = turf.point([parseFloat(data.longitude), parseFloat(data.latitude)]); // Use the longitude and latitude from the data
      const inside = turf.booleanPointInPolygon(point, polygon);
      
      // Create the updated position object with the insideGeofence property
      const updatedPosition = {
          ...data,
          insideGeofence: inside
      };
      
      // Update the state with the updated position
      setPositionsInsideGeofence(updatedPosition);
    };
  
    checkGeofence();
  }, []);

  const customIcon = new Icon({
    iconUrl: locationImg,
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

          {positionsInsideGeofence && (
            <Marker position={[
              parseFloat(positionsInsideGeofence.latitude),
              parseFloat(positionsInsideGeofence.longitude)
              ]}
              icon={customIcon}
            >
              <Popup>
                You are logged in at this position.<br />
                This position is {positionsInsideGeofence.insideGeofence ? 'inside' : 'outside'} the geofence.
              </Popup>
            </Marker>
          )}

          {positionsInsideGeofence && positionsInsideGeofence.time_out_latitude && (
            <Marker
              position={[
                parseFloat(positionsInsideGeofence.time_out_latitude),
                parseFloat(positionsInsideGeofence.time_out_longitude)
              ]}
              icon={customIcon}
            >
              <Popup>
                You are logged out at this position.<br />
              </Popup>
            </Marker>
          )}

        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
