import React, { useState, useRef } from 'react'
import './AccessCamera.css'
import { dateFormatted } from '../../../customs/global/manageDates'
import { format } from 'date-fns';
import { getLoggedInID } from '../../../customs/global/manageLocalStorage';

const AccessCamera = (props) => {

  const canvasRef = useRef(null);

  const [error, setError] = useState(null);

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

  const getTimeIn = async (e) => {
    e.preventDefault();
  
    const currentDate = new Date();
    const formattedDate = dateFormatted(currentDate);
    const formattedTime = format(currentDate, 'HH:mm:ss');
  
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
  
    try {
      const imageBlob = await captureImage();
  
      // Helper function to get a single position sample
      const getPositionSample = () =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true }
          );
        });
  
      // Collect multiple position samples
      const positionSamples = await Promise.all(
        Array.from({ length: 3 }, () => getPositionSample())
      );
  
      // Destructure and calculate average latitude and longitude
      const { latitude, longitude } = positionSamples
        .map(({ coords: { latitude, longitude } }) => ({ latitude, longitude }))
        .reduce(
          (acc, { latitude, longitude }) => ({
            latitude: acc.latitude + latitude,
            longitude: acc.longitude + longitude,
          }),
          { latitude: 0, longitude: 0 }
        );
  
      const avgCoords = {
        latitude: latitude / positionSamples.length,
        longitude: longitude / positionSamples.length,
      };
  
      // Construct coordinates object
      const coords = {
        ...avgCoords,
        shift_date: formattedDate,
        time_in: formattedTime,
        break_start: '',
        break_end: '',
        ot_start: '',
        ot_end: '',
        remarks: '',
        user_id: props.user_id,
        status: 'pending',
      };
  
      // Saving data to database
      props.submitTimeIn(coords, imageBlob);
    } catch (error) {
      showError(error);
    }
  };
  

  const captureImage = async () => {
    if (!props.videoRef.current || !canvasRef.current) return;
  
    // Create a canvas dynamically
    const canvas = document.createElement('canvas');
    const video = props.videoRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions based on the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert the canvas content to a Blob (JPEG format)
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) { 
            resolve(blob); // Return the Blob
          } else {
            reject(new Error('Failed to capture image as Blob'));
          }
        },
        'image/jpeg',
        0.8 // Quality (optional, 0.0 to 1.0 for lossy formats like JPEG)
      );
    });
  };

  return (
    <div className="modal fade" ref={props.cameraModalRef} id="cameraModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={true} >
      
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Please face the front of the camera</h5>
          </div>
          <div className="modal-body">
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            {props.capture ? (
              <div>
                <img src={props.capture} alt="Captured" style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid #ddd" }} />
              </div>
            ) : (
              <div style={{ marginTop: "20px", border: "1px solid #ddd",borderRadius: "8px", overflow: "hidden"}}>
                <video ref={props.videoRef} style={{ width: "100%", height: "auto" }} autoPlay></video>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={props.closeCameraModal}>
              Close
            </button>
    
            <button className="btn btn-primary btn-sm" onClick={(e) => getTimeIn(e)} disabled={props.dtrPostLoading}>
              {props.dtrPostLoading ? "Loading..." : "Capture"}
            </button>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default AccessCamera