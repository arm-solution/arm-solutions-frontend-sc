import React, { useState } from 'react'
import { format } from 'date-fns';
import './Home.css';
import axios from 'axios';

const Home = () => {

  const [time, setTime] = useState(new Date());
  const [error, setError] = useState(null);

  const [attendanceDetails, setAttendanceDetails] = useState({
    longitude: '',
    latitude: '',
    dateIn: '',
    dateOut: '',
    timeIn: '',
    timeOut: ''
  });


  const showError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            setError("An unknown error occurred.");
            break;
        default:
            setError("An unknown error occurred.");
            break;
    }
};


const getTimeIn = async () => {

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MM/dd/yyyy');
  const formattedTime = format(currentDate, 'hh:mm:ss a');
  

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
          const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              dateIn: formattedDate,
              timeIn: formattedTime,
          };


          setAttendanceDetails(coords);
          const response = await axios.post('http://localhost:5000/users/timein', coords);
          console.log('this is the api response ', response);
         
      }, showError);
  } else {
      setError("Geolocation is not supported by this browser.");
  }

  };
  
  
  return (
    
    <>

    <div className="row">

      <div className="col-md-6">
      <h1>Real-Time Clock</h1>
      <h2>{time.toLocaleTimeString()}</h2>

      </div>
      <div className="col-md-6 text-end">
      <h1>Welcome Lance</h1>

      <h2>{attendanceDetails.dateIn}</h2>
      </div>

    </div>

    <div className="row">
      <button className="btn btn-success time-in-btn" onClick={getTimeIn}>Time In</button>
    </div>


    </>
  )
}

export default Home