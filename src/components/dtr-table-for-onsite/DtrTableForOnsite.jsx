import React, {useState, useEffect, useRef} from 'react';
import './DtrTableForOnsite.css';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { updateDtrById, getWeeklyDtr, postDtr } from '../../store/features/dtrSlice';
import { calculateDecimalHours, getCurrentDateForCalculation } from '../../customs/global/manageDates';
import { getLoggedInID } from '../../customs/global/manageLocalStorage';
import { handleConfirmation } from '../../customs/global/alertDialog';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import AccessCamera from '../modals-forms/access-camera-modal/AccessCamera';
import { errorDialog } from '../../customs/global/alertDialog';
import CurrentShift from '../current-shift-container/CurrentShift';
import { getCurrentDtr } from '../../store/features/dtrSlice';

const DtrTableForOnsite = (props) => {

  const modalRef = useRef(null);
  const modalDtrRemarks = useRef(null);
  const modalCameraRef = useRef(null);
  const videoRef = useRef(null);

  const [shift, setShift] = useState([])
  const [loadingSessionStorage, setLoadingSessionStorage] = useState(false);
  const [error, setError] = useState(null);
  const [accessOut, setAccessOut] = useState(false);
  const [capture, setCapture] = useState(null);
  const [notification, setNotification] = useState({
        message: '',
        type: ''
  });

  const [myCurrentDtr, setMyCurrentDtr ] = useState(null)

  const dispatch = useDispatch()

  const { currentDtr, loading: dtrPostLoading } = useSelector(state => state.dtr);


  useEffect(() => {
    if(currentDtr) {
      setMyCurrentDtr(currentDtr[0])
    }
  }, [currentDtr, dispatch])
  
  const handleBreakIn = async (e) => {
    e.preventDefault();
    setLoadingSessionStorage(true);

    const currentDate = new Date(); 
    const formattedTime = format(currentDate, 'HH:mm:ss');

    if (props.employee) {
      // get data directly from API response
      const { payload: cuurentDtrPayload } = await dispatch(getCurrentDtr({ user_id: props.employee.id, status: 'pending' }))

      if (cuurentDtrPayload && cuurentDtrPayload.length > 0) {
        const updateDtr = {
          ...cuurentDtrPayload[0],
          break_start: formattedTime
        };

        const { payload: updateDtrPayload } = await dispatch(updateDtrById(updateDtr));

        if (updateDtrPayload?.success) {
          setShift(updateDtr);
          alert("break in");
        } else {
          console.log("update failed", updateDtrPayload.payload);
        }
      }
    }
    setLoadingSessionStorage(false);
  };


    // for breakout
    const handleBreakOut = async (e) => {
        e.preventDefault();
        setLoadingSessionStorage(true);
        
        const currentDate = new Date(); 
        const formattedTime = format(currentDate, 'HH:mm:ss');

        if(props.employee) {
          
        const { payload: cuurentDtrPayload } = await dispatch(getCurrentDtr({ user_id: props.employee.id, status: 'pending' }))
          
          if(cuurentDtrPayload) {
  
            const updateDtr = {
              ...cuurentDtrPayload[0], 
              break_end: formattedTime
            }
  
            const { payload: updateDtrPayload } = await dispatch(updateDtrById(updateDtr));
            
            if(updateDtrPayload.success) {
                setShift(updateDtr);
            }
  
            setLoadingSessionStorage(false);
          }
        }
        

      
      //   setLoadingSessionStorage(false);
      };


  // time out method
  const timeOut = async (e) => {
    e.preventDefault();

  
    const currentDate = new Date();
    const formattedTime = format(currentDate, 'HH:mm:ss');
  
    // const storeShift = sessionStorage.getItem('currentShift');


    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
  
    try {

      if(props.employee) {

        const { payload: cuurentDtrPayload } = await dispatch(getCurrentDtr({ user_id: props.employee.id, status: 'pending' }))

        const updateDtr = {
          ...cuurentDtrPayload[0], 
            time_out: formattedTime,
            time_out_latitude: '14.0401',
            time_out_longitude: '121.114'
        }

        const { payload: updateDtrPayload } = await dispatch(updateDtrById(updateDtr));
  
        if(updateDtrPayload.success) {
          setShift(updateDtr);
         } else {
          console.error("Error", updateDtrPayload);
         }
      }

    } catch (error) {
      console.error("Error processing timeout:", error);
    }
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

          coords.user_id = props.employee.id ? props.employee.id : getLoggedInID();
      
          formData.append('coords', JSON.stringify(coords));
      
          if (imageBlob) {
            formData.append('image', imageBlob);
          }
      
        //   Debug: Inspect the FormData contents
          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
      
        //   // Dispatch action to post data
          const { payload } = await dispatch(postDtr(formData));
      
          // Handle response
          if (payload.success) {
            // sessionStorage.setItem('currentShift', JSON.stringify({ ...coords, id: payload.lastid }));
            setShift(coords);
            // window.dispatchEvent(new Event('currentShift'));
    
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

    if(props.employee) {
      const { payload: cuurentDtrPayload } = await dispatch(getCurrentDtr({ user_id: props.employee.id, status: 'pending' }))
      
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
  
          if(cuurentDtrPayload && cuurentDtrPayload.length > 0 ) {

            const updatedDtr = {
              ...cuurentDtrPayload[0],
              status:  'for approval'
            }
      
      
            const { payload: updateDtrPayload } = await dispatch(updateDtrById(updatedDtr));
      
            if(updateDtrPayload.success) {
              setShift([]);  
              window.location.reload();
              return true
            }
  
          }
      })
    }

  
  }
    

  return (
    <>
    
    <div className="container">
        <div className="row">
          {shift && Object.keys(shift).length > 0 ? (
            <>
              {shift.break_start === '' || shift.break_start === '00:00:00' ? (
                <button
                  className="btn btn-warning time-in-btn"
                  onClick={(e) => handleBreakIn(e)}
                >
                  Break In
                </button>
              ) : shift.break_end === '' || shift.break_end === '00:00:00' ? (
                <button
                  className="btn btn-warning time-in-btn"
                  onClick={(e) => handleBreakOut(e)}
                >
                  Break Out
                </button>
              ) : (
                  <button
                    className="btn btn-danger time-in-btn"
                    onClick={(e) => timeOut(e)}
                    disabled={accessOut}
                  >
                    Time Out
                  </button>
              )}
              {(shift.time_out === '' || shift.time_out === '00:00:00') && (
                  <button
                    className="btn btn-success time-in-btn"
                    onClick={(e) => handleEarlyTimeOut(e)}
                    disabled={accessOut}
                  >
                    Early Time Out
                  </button>
              )}
            </>
          ) : (
            <button
              className="btn btn-success btn-sm time-in-btn"
              onClick={(e) => handleCameraModal(e)}
            >
              Time In
            </button>
          )}


            <AccessCamera
                cameraModalRef={modalCameraRef}
                submitTimeIn={submitTimeIn}
                videoRef={videoRef}
                dtrPostLoading={dtrPostLoading}
                capture={capture}
                closeCameraModal={closeCameraModal}
                user_id={props.employee.id}
            />

            <div className="row mt-4">
            <CurrentShift 
                shiftState={{ shift, setShift }}
                handleOt={handleOt}
                submitMyDtr={submitMyDtr}
                position='onsite'
                user_id={props.employee.id}
            />
          </div>
        </div>


    </div>

    
    </>
  )
}

export default DtrTableForOnsite