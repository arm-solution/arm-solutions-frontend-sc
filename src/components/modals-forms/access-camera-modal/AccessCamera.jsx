import React, { useState, useRef } from 'react'
import './AccessCamera.css'
import { dateFormatted } from '../../../customs/global/manageDates'
import { format } from 'date-fns';
import { getLoggedInID } from '../../../customs/global/manageLocalStorage';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

const AccessCamera = (props) => {

  const canvasRef = useRef(null);

  const [error, setError] = useState(null);
  const [loadingSessionStorage, setLoadingSessionStorage] = useState(false);
  const [capture, setCapture] = useState(null);
  
  

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
    setLoadingSessionStorage(true);
  
    const currentDate = new Date();
    const formattedDate = dateFormatted(currentDate);
    const formattedTime = format(currentDate, 'HH:mm:ss');
  
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoadingSessionStorage(false);
      return;
    }
  
    // Array to store multiple position samples
    const positions = [];
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        positions.push(position);
        // Check if we have enough samples (e.g., 3 samples)
        if (positions.length >= 3) {
          navigator.geolocation.clearWatch(watchId);
  
          // Calculate average latitude and longitude for improved accuracy
          const avgCoords = {
            latitude: positions.reduce((sum, pos) => sum + pos.coords.latitude, 0) / positions.length,
            longitude: positions.reduce((sum, pos) => sum + pos.coords.longitude, 0) / positions.length
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
            user_id: getLoggedInID(),
            status: 'pending'
          };
          
          // saving data to database
          props.submitPosition(coords);
        }
      },
      (error) => {
        showError(error);
        setLoadingSessionStorage(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const closeCameraModal = () => {
    const modalElement = props.cameraModalRef.current;
    if (modalElement) {
      const modal = Modal.getInstance(modalElement); // Get existing instance

      if (modal) {
        if (props.videoRef.current && props.videoRef.current.srcObject) {
          const tracks = props.videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop()); // Stop all tracks
          props.videoRef.current.srcObject = null;

        }
        
        setCapture(null);
        modal.hide(); // Hide the modal
      }
    }
  };

  const captureImage = async () => {
    if (!props.videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = props.videoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to Blob
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

    console.log("blob", blob);
    return blob;
  }

  // const uploadImage = async () => {
  //   const blob = await captureImage();
  //   if (!blob) return;

  //   const formData = new FormData();
  //   formData.append("file", blob, `captured-${Date.now()}.png`);

  //   try {
  //     // Replace with your API endpoint for upload
  //     const response = await axios.post("YOUR_API_ENDPOINT", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.data && response.data.link) {
  //       setUploadLink(response.data.link); // Set the uploaded file's URL
  //       alert("Image uploaded successfully!");
  //     } else {
  //       alert("Failed to upload the image.");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     alert("Error uploading image. Please try again.");
  //   }
  // };

  return (
    <div className="modal fade" ref={props.cameraModalRef} id="exampleModalCenter" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
          </div>
          <div className="modal-body">
          <canvas ref={canvasRef} style={{ display: "none" }} />
          { capture ? (
              <div>
                  <img src={capture} alt="Captured" style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid #ddd" }} />
              </div>
          ) : (
            <div style={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
              <video ref={props.videoRef} style={{ width: "100%", height: "auto" }} autoPlay />
            </div>
          )}

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={closeCameraModal}>Close</button>
           
            <button className="btn btn-primary btn-sm" onClick={captureImage} disabled={loadingSessionStorage}>
                {loadingSessionStorage ? 'Loading...' : 'Capture'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessCamera