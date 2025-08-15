import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns';
import './DtrPage.css';
import { getLoggedInFullname, getLoggedInID } from '../../../customs/global/manageLocalStorage';
import { dateFormatted } from '../../../customs/global/manageDates'; 
import { useDispatch, useSelector } from 'react-redux';
import { postDtr, getDtrById, updateDtrById, getWeeklyDtr, getCurrentDtr  } from '../../../store/features/dtrSlice';
import Loading from '../../../components/loading-spinner/Loading';
import CurrentShift from '../../../components/current-shift-container/CurrentShift';
import { errorDialog } from '../../../customs/global/alertDialog';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import DtrDetailsModal from '../../../components/modals-forms/dtr-details/DtrDetailsModal';
import { handleConfirmation } from '../../../customs/global/alertDialog';
import { calculateDecimalHours, getCurrentDateForCalculation } from '../../../customs/global/manageDates';
import WeekDtr from '../../../components/week-dtr-table/WeekDtr';
import FloatNotification from '../../../components/float-notification/FloatNotification';
import DtrRemarksModal from '../../../components/modals-forms/dtr-remarks-modal/DtrRemarksModal';
import AccessCamera from '../../../components/modals-forms/access-camera-modal/AccessCamera';

const Home = () => {

  const modalRef = useRef(null);
  const modalDtrRemarks = useRef(null);
  const modalCameraRef = useRef(null);
  const videoRef = useRef(null);
  

  const [currentTime, setCurrentTime] = useState(new Date());
  const [capture, setCapture] = useState(null);
  // const [myDtr, setMyDtr] = useState([])
  const [shift, setShift] = useState([])
  const [selectedDtr, setSelectedDtr] = useState(null);
  const [loadingSessionStorage, setLoadingSessionStorage] = useState(false)
  const [notification, setNotification] = useState({
        message: '',
        type: ''
  })
  const [accessOut, setAccessOut] = useState(false);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const { dtr, weeklyDtr, currentDtr, loading: dtrLoading, dtrPostLoading } = useSelector(state => state.dtr);

  useEffect(() => {
    const getDefaultLoad = () => {
      if(getLoggedInID()) {
        dispatch(getDtrById({ id: getLoggedInID() }));
        dispatch(getWeeklyDtr(getLoggedInID()));
        dispatch(getCurrentDtr({ user_id: getLoggedInID(), status: 'pending'}));
      }
    }

    getDefaultLoad();
  }, [dispatch]); 
  
  useEffect(() => {
    if(currentDtr.length > 0) {
      const { image_capture, ...rest} = currentDtr[0] 
      sessionStorage.setItem('currentShift', JSON.stringify(rest));

      window.dispatchEvent(new Event('currentShift'));
    }
  }, [currentDtr])

  useEffect(() => {

    if (shift?.time_out) {
      setAccessOut(true);
    } else {
      setAccessOut(false);
    }

  }, [shift]);
  
  useEffect(() => {
    // Set up an interval to update the current time every second
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(timer);
  }, []);

  // handle closing camera modal
  const closeCameraModal = () => {
    const modalElement = modalCameraRef.current;
  
    if (modalElement) {
      const modal = Modal.getInstance(modalElement); // Get the Bootstrap modal instance
  
      if (modal) {
        // Stop video tracks if playing
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
  
        // Clear captured data
        setCapture(null);
  
        // Move focus back to a logical element outside the modal
        const triggerButton = document.querySelector('[data-bs-target="#cameraModal"]');
        if (triggerButton) {
          triggerButton.focus();
        } else {
          document.body.focus(); // Fallback to moving focus to the body
        }
  
        // Hide the modal
        modal.hide();
      }
    }
  };

  // getting position 
  const submitTimeIn = async (coords, imageBlob) => {
    try {
      const formData = new FormData();
  
      formData.append('coords', JSON.stringify(coords));
  
      if (imageBlob) {
        formData.append('image', imageBlob);
      }
  
      // Debug: Inspect the FormData contents
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }
  
      // Dispatch action to post data
      const { payload } = await dispatch(postDtr(formData));
  
      // Handle response
      if (payload.success) {
        sessionStorage.setItem('currentShift', JSON.stringify({ ...coords, id: payload.lastid }));
        setShift(coords);
        window.dispatchEvent(new Event('currentShift'));

        // close camera modal
        closeCameraModal();
      } else {
        console.log("payload message", payload);
        errorDialog(payload.message || 'Cannot log in');
      }
    } catch (error) {
      errorDialog('An error occurred while logging in');
    }
  };

  
  
  // time out method
  const timeOut = async (e) => {
    e.preventDefault();

  
    const currentDate = new Date();
    const formattedTime = format(currentDate, 'HH:mm:ss');
  
    const storeShift = sessionStorage.getItem('currentShift');

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    if (!storeShift) return;
  
    try {
      const myShift = JSON.parse(storeShift);
      myShift.time_out = formattedTime;

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
        .map(({ coords: { latitude, longitude }}) => ({ latitude, longitude }))
        .reduce(
          (acc, { latitude, longitude }) => ({
            latitude: acc.latitude + latitude,
            longitude: acc.longitude + longitude,
          }),
          { latitude: 0, longitude: 0 }
        );
  
      const avgCoords = {
        time_out_latitude: latitude / positionSamples.length,
        time_out_longitude: longitude / positionSamples.length,
      };
  
      // Calculate total hours worked and break hours
      const totalHours = calculateDecimalHours(getCurrentDateForCalculation(), myShift.time_in, formattedTime);
      const breakHours = myShift.break_start 
        ? calculateDecimalHours(getCurrentDateForCalculation(), myShift.break_start, formattedTime) 
        : 0;
  
      myShift.total_hours = totalHours - breakHours;
      myShift.status = 'completed';
      myShift.time_out_latitude = avgCoords.time_out_latitude;
      myShift.time_out_longitude = avgCoords.time_out_longitude;

      const { payload } = await dispatch(updateDtrById(myShift));

      if(payload.success) {
        sessionStorage.setItem('currentShift', JSON.stringify(myShift));
        setShift(myShift);
        dispatch(getWeeklyDtr(getLoggedInID()));
        window.dispatchEvent(new Event('currentShift'));
       } else {
        console.log("Error", payload);
       }

    } catch (error) {
      console.error("Error processing timeout:", error);
    }
  };
  

  const handleBreakIn = async (e) => {
    e.preventDefault();
    setLoadingSessionStorage(true);

    const currentDate = new Date(); 
    const formattedTime = format(currentDate, 'HH:mm:ss');

    const storeShift = sessionStorage.getItem('currentShift');

    if(storeShift) {
      const myShift = JSON.parse(storeShift);
      myShift.break_start = formattedTime;
      const { payload } = await dispatch(updateDtrById(myShift));
      
      if(payload.success) {
        sessionStorage.setItem('currentShift', JSON.stringify(myShift));
        setShift(myShift);


        window.dispatchEvent(new Event('currentShift'));
      } else {
        console.log("payload", payload);
      }


      setLoadingSessionStorage(false);
    }

    setLoadingSessionStorage(false);
  }

  // break out function
  const handleBreakOut = async (e) => {
    e.preventDefault();
  
    setLoadingSessionStorage(true);
  
    const currentDate = new Date();
    const formattedTime = format(currentDate, 'HH:mm:ss');
  
    const storeShift = sessionStorage.getItem('currentShift');
  
    if (storeShift) {
      const {image_capture, ...myShift} = JSON.parse(storeShift);
      myShift.break_end = formattedTime;
  
      const { payload } = await dispatch(updateDtrById(myShift));
  
      if (payload.success) {
        // Update sessionStorage
        sessionStorage.setItem('currentShift', JSON.stringify(myShift));
        // Update the state
        setShift({ ...myShift });
  
        // Force a re-render
        window.dispatchEvent(new Event('currentShift'));
      } else {
        console.log("Error", payload);
      }
  
      setLoadingSessionStorage(false);
    }
  
    setLoadingSessionStorage(false);
  };
  

  const handleEarlyTimeOut = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedTime = format(currentDate, 'hh:mm:ss');

    const storeShift = sessionStorage.getItem('currentShift');

    handleConfirmation({
      title: "",
      text: "",
      icon: "",
      confirmButtonText: "",
      cancelButtonText: "",
      confirmationTitle: "",
      confirmationText: "",
      successTitle: "", 
      successText: "",
      failedMessageTitle: "",
      failedMessageText: ""
      }, async () => {

        if(storeShift) {
          const myShift = JSON.parse(storeShift)
          myShift.time_out = formattedTime;
    
          const { payload }  = await dispatch(updateDtrById(myShift));

          if(payload.success) {
            // sessionStorage.setItem('currentShift', JSON.stringify(coords));
            setShift([]);
            sessionStorage.removeItem('currentShift');
            window.dispatchEvent(new Event('currentShift')); // Trigger the custom event

            return true
          } 

          return false;

        } else {
          return false;
        }
      })
  } 

  const handleView = (dtr) => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedDtr(dtr);
    modal.show()
  }

  const handleOt = async (e) => {
    const { value, name } = e.target;
  
    e.preventDefault();
    setLoadingSessionStorage(true);
  
    // Retrieve and parse the stored shift information from session storage
    const storeShift = sessionStorage.getItem('currentShift');
  
    if (storeShift) {
      const myShift = JSON.parse(storeShift);
  
      // Check if the shift's time_out is empty or null
      if (!myShift.time_out) {
        setNotification({
          message: 'Need to time out first',
          type: 'error'
        });
        setLoadingSessionStorage(false); // Stop loading here if condition met
        return;
      }
      
      if (!myShift.remarks) {
        const modalElement = modalDtrRemarks.current;
        const modal = new Modal(modalElement);
        modal.show();
        setLoadingSessionStorage(false); // Stop loading here if condition met
        return;
      }
  
      // Update the shift object based on the input name ('ot_start' or 'ot_end')
      if (name === 'ot_start') {
        myShift.ot_start = value;
      } else {
        myShift.ot_end = value;
      }
  
      // Dispatch the update action and handle response
      const { payload } = await dispatch(updateDtrById(myShift));
  
      if (payload.success) {
        sessionStorage.setItem('currentShift', JSON.stringify(myShift));
        setShift(myShift);
        
        // Dispatch a custom event to signal updates to other parts of the app
        window.dispatchEvent(new Event('currentShift'));
      } else {
        console.error("Error", payload);
      }
    }
  
    // Reset loading state at the end of the function
    setLoadingSessionStorage(false);
  };
  
  // this submit dtr when the record is completed
  const submitMyDtr = async(e) => {
    e.preventDefault();
    setLoadingSessionStorage(true);

    const storeShift = sessionStorage.getItem('currentShift');


    handleConfirmation({
      title: "You Want To Time Out?",
      text: " ",
      icon: "",
      confirmButtonText: "",
      cancelButtonText: "",
      confirmationTitle: "",
      confirmationText: "",
      successTitle: "", 
      successText: ""
      }, async () => {

        if(storeShift) {
          const myShift = JSON.parse(storeShift)
          if(myShift.status === 'pending') {
            return false;
          } 
    
          myShift.status = 'for approval';
    
          const { payload } = await dispatch(updateDtrById(myShift));
    
          if(payload.success) {
            setShift([]);
            sessionStorage.removeItem('currentShift');
            window.dispatchEvent(new Event('currentShift')); // Trigger the custom event

            return true
          }

        } else {
          return false;
        }
      })
  }

  const handleCameraModal = async(e) => {
    e.preventDefault();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Change to "environment" for the rear camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

      }
      const modalElement = modalCameraRef.current;
      const modal = new Modal(modalElement);
  
      modal.show();
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access the camera. Please check your permissions.");
    }

  }

   
  return (
    <>

    { dtrLoading && ( <Loading /> ) }

    {
      notification.message && <FloatNotification message={notification.message} type={notification.type} onClose={() => setNotification('')} />
    }

    <div className="container">
      
          <div className="row">

            <div className="col-md-6">
            <h2>{currentTime.toLocaleTimeString()}</h2>

            </div>
            <div className="col-md-6 text-end">
            <h1>Welcome <span style={{ textTransform: 'uppercase', color: 'green' }}>{ getLoggedInFullname() }</span></h1>
            </div>

          </div>
          <div className="row">
          {shift && Object.keys(shift).length > 0 ? (
              <>
                {shift.break_start === '' || shift.break_start === '00:00:00' ? (
                  <button className="btn btn-warning time-in-btn" onClick={(e) => handleBreakIn(e)}>Break In</button>
                ) : (
                  shift.break_end === '' || shift.break_end === '00:00:00' ? (
                    <button className="btn btn-warning time-in-btn" onClick={(e) => handleBreakOut(e)}>Break Out</button>
                  ) : ( 
                    <button className="btn btn-danger time-in-btn" onClick={(e) => timeOut(e)} disabled={accessOut}>Time Out</button>
                  ))
                }
                <button className="btn btn-success time-in-btn" onClick={(e) => handleEarlyTimeOut(e)} disabled={accessOut}>Early Time Out</button>
              </>
            ) : (
              <button className="btn btn-success btn-sm time-in-btn" onClick={(e) => handleCameraModal(e)}>Time In</button>
            )}


            <AccessCamera
             cameraModalRef={modalCameraRef}
             submitTimeIn={submitTimeIn}
             videoRef={videoRef}
             dtrPostLoading={dtrPostLoading}
             capture={capture}
             closeCameraModal={closeCameraModal}
             user_id={getLoggedInID()}
            />

          </div>

          <div className="row mt-4">
            <CurrentShift 
            shiftState={{ shift, setShift }}
            handleOt={handleOt}
            submitMyDtr={submitMyDtr}
            />
          </div>

    </div>

    <div className="mt-5">
      <WeekDtr
        dtr={weeklyDtr}
        handleViewDetails={handleView}
      />
    </div>

    <DtrDetailsModal 
      selectedDtr={selectedDtr}
      modalRef={modalRef}
    />

    <DtrRemarksModal 
      modalDtrRemarks={modalDtrRemarks}
    />


    </>
  )
}

export default Home