import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import locationImg from './../assets/icon/location.png';
import { useLocation } from 'react-router-dom';
import home from './../assets/icon/home.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import * as turf from '@turf/turf';
import { formatDateReadable } from '../customs/global/manageDates';

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
  ], []);

  // ⭐ FIX: initialize as empty array, NOT null
  const [positionsInsideGeofence, setPositionsInsideGeofence] = useState([]);


  useEffect(() => {
    // If date-range search results are being used, skip URL parsing
    if (props.dtrWithDateRange && props.dtrWithDateRange.length > 0) return;

    const queryParams = new URLSearchParams(myLocation.search);
    const raw = queryParams.get("data");
    if (!raw) return;

    const data = JSON.parse(decodeURIComponent(raw));

    const polygon = turf.polygon([geofenceCoords]);
    const point = turf.point([+data.longitude, +data.latitude]);

    const inside = turf.booleanPointInPolygon(point, polygon);

    const updatedPosition = { ...data, insideGeofence: inside };

    setPositionsInsideGeofence(prev => {
      const exists = prev.some(
        p =>
          p.latitude === updatedPosition.latitude &&
          p.longitude === updatedPosition.longitude &&
          p.shift_date === updatedPosition.shift_date
      );

      return exists ? prev : [...prev, updatedPosition];
    });
  }, [myLocation.search, props.dtrWithDateRange]);

  useEffect(() => {
    if (props.dtrWithDateRange && props.dtrWithDateRange.length > 0) {
      setPositionsInsideGeofence(props.dtrWithDateRange);
    }
  }, [props.dtrWithDateRange]);


  const customIcon = new Icon({
    iconUrl: locationImg,
    iconSize: [38, 38]
  });

  const ArmSolIcon = new Icon({
    iconUrl: home,
    iconSize: [38, 38]
  });


  useEffect(() => {
    console.log("positionsInsideGeofence", positionsInsideGeofence)
  }, [positionsInsideGeofence])
  

  return (
    <div className='map-container'>
      <MapContainer center={bilucaoCoordinates} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>

          {/* Home Marker */}
          <Marker position={[14.0401, 121.1140]} icon={ArmSolIcon}>
            <Popup>
              <b>Arm Solution Enterprises</b><br />
              This position is inside the geofence.
            </Popup>
          </Marker>

          {/* Geofence Polygon */}
          <Polygon positions={geofenceCoords} color="blue" />

          {/* LOGIN MARKERS */}
          {positionsInsideGeofence.map((pos, index) => (
            <Marker
              key={index}
              position={[
                parseFloat(pos.latitude),
                parseFloat(pos.longitude)
              ]}
              icon={customIcon}
            >
              <Popup>
                You are logged in at this position. - {pos.shift_date ? formatDateReadable(pos.shift_date) : ''}<br />
                This position is {pos.insideGeofence ? "inside" : "outside"} the geofence.
              </Popup>
            </Marker>
          ))}

          {/* LOGOUT MARKERS */}
          {positionsInsideGeofence.map((pos, index) =>
            pos.time_out_latitude ? (
              <Marker
                key={`timeout-${index}`}
                position={[
                  parseFloat(pos.time_out_latitude),
                  parseFloat(pos.time_out_longitude)
                ]}
                icon={customIcon}
              >
                <Popup>You logged out at this position. - {pos.shift_date_end ? formatDateReadable(pos.shift_date_end) : ''}</Popup>
              </Marker>
            ) : null
          )}

        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
