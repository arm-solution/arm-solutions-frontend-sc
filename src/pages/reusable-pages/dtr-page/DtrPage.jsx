import React, { useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns';
import './DtrPage.css';
import { getDepartmentLoggedIn, getLoggedInFullname, getLoggedInID } from '../../../customs/global/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { postDtr, getDtrById, updateDtrById, getWeeklyDtr, getCurrentDtr } from '../../../store/features/dtrSlice';
import Loading from '../../../components/loading-spinner/Loading';
import CurrentShift from '../../../components/current-shift-container/CurrentShift';
import { errorDialog } from '../../../customs/global/alertDialog';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import DtrDetailsModal from '../../../components/modals-forms/dtr-details/DtrDetailsModal';
import { handleConfirmation } from '../../../customs/global/alertDialog';
import { calculateDecimalHours, getCurrentDateForCalculation, dateFormatted, calculateFlexibleDecimalHours } from '../../../customs/global/manageDates';
import WeekDtr from '../../../components/week-dtr-table/WeekDtr';
import FloatNotification from '../../../components/float-notification/FloatNotification';
import DtrRemarksModal from '../../../components/modals-forms/dtr-remarks-modal/DtrRemarksModal';
import AccessCamera from '../../../components/modals-forms/access-camera-modal/AccessCamera';


const Home = () => {
  // Refs
  const modalRef = useRef(null);
  const modalDtrRemarks = useRef(null);
  const modalCameraRef = useRef(null);
  const videoRef = useRef(null);
  
  // State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [capture, setCapture] = useState(null);
  const [shift, setShift] = useState([]);
  const [selectedDtr, setSelectedDtr] = useState(null);
  const [loadingSessionStorage, setLoadingSessionStorage] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [accessOut, setAccessOut] = useState(false);

  const dispatch = useDispatch();
  const { dtr, weeklyDtr, currentDtr, loading: dtrLoading, dtrPostLoading } = useSelector(state => state.dtr);

  // Initialize data on component mount
  useEffect(() => {
    const userId = getLoggedInID();
    if (userId) {
      dispatch(getDtrById({ id: userId }));
      dispatch(getWeeklyDtr(userId));
      dispatch(getCurrentDtr({ user_id: userId, status: 'pending' }));
    }
  }, [dispatch]);

  // Handle current DTR changes
  useEffect(() => {
    if (currentDtr.length > 0) {
      const { image_capture, ...rest } = currentDtr[0];
      sessionStorage.setItem('currentShift', JSON.stringify(rest));
      window.dispatchEvent(new Event('currentShift'));
    }
  }, [currentDtr]);

  // Handle shift state changes
  useEffect(() => {
    setAccessOut(!!shift?.time_out);
  }, [shift]);

  // Clock timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Utility functions
  const getCurrentDate = useCallback(() => format(new Date(), 'EEEE, MMMM dd, yyyy'), []);
  
  const getTimeComponents = useCallback(() => {
    const now = new Date();
    return {
      time: format(now, 'hh:mm'),
      seconds: format(now, 'ss'),
      period: format(now, 'a')
    };
  }, []);

  const closeCameraModal = useCallback(() => {
    const modalElement = modalCameraRef.current;
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        if (videoRef.current?.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
        setCapture(null);
        modal.hide();
      }
    }
  }, []);

  // Core functions
  const submitTimeIn = async (coords, imageBlob) => {
    try {
      const formData = new FormData();
      formData.append('coords', JSON.stringify(coords));
      if (imageBlob) formData.append('image', imageBlob);

      const { payload } = await dispatch(postDtr(formData));

      if (payload.success) {
        const shiftData = { ...coords, id: payload.lastid };
        sessionStorage.setItem('currentShift', JSON.stringify(shiftData));
        setShift(shiftData);
        window.dispatchEvent(new Event('currentShift'));
        closeCameraModal();
      } else {
        errorDialog(payload.message || 'Cannot log in');
      }
    } catch (error) {
      errorDialog('An error occurred while logging in');
    }
  };

  // handle time out function
  const timeOut = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedTime = format(currentDate, 'HH:mm:ss');
    const storeShift = sessionStorage.getItem('currentShift');

    if (!navigator.geolocation || !storeShift) return;

    try {
      const myShift = JSON.parse(storeShift);
      myShift.time_out = formattedTime;

      // Get location samples
      const getPositionSample = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });

      const positionSamples = await Promise.all(Array.from({ length: 3 }, () => getPositionSample()));
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
        time_out_latitude: latitude / positionSamples.length,
        time_out_longitude: longitude / positionSamples.length,
      };

      // const totalHours = calculateDecimalHours(getCurrentDateForCalculation(), myShift.time_in, formattedTime);
      const totalHours = calculateFlexibleDecimalHours(dateFormatted(myShift.shift_date), getCurrentDateForCalculation(), myShift.time_in, myShift.time_out);
      // const breakHours = myShift.break_start ? calculateDecimalHours(getCurrentDateForCalculation(), myShift.break_start, formattedTime) : 0;

      Object.assign(myShift, {
        total_hours: totalHours ? totalHours : 0,
        shift_date_end: getCurrentDateForCalculation(),
        status: 'completed',
        ...avgCoords
      });

      const { payload } = await dispatch(updateDtrById(myShift));
      if (payload.success) {
        sessionStorage.setItem('currentShift', JSON.stringify(myShift));
        setShift(myShift);
        dispatch(getWeeklyDtr(getLoggedInID()));
        window.dispatchEvent(new Event('currentShift'));
      }
    } catch (error) {
      console.error("Error processing timeout:", error);
    }
  };

  // const handleBreakAction = async (e, actionType) => {
  //   e.preventDefault();
  //   setLoadingSessionStorage(true);

  //   const currentDate = new Date();
  //   const formattedTime = format(currentDate, 'HH:mm:ss');
  //   const storeShift = sessionStorage.getItem('currentShift');

  //   if (storeShift) {
  //     let myShift = JSON.parse(storeShift);
      
  //     if (actionType === 'break_end') {
  //       const { image_capture, ...cleanShift } = myShift;
  //       cleanShift.break_end = formattedTime;
  //       myShift = cleanShift;
  //     } else {
  //       myShift[actionType] = formattedTime;
  //     }

  //     const { payload } = await dispatch(updateDtrById(myShift));
  //     if (payload.success) {
  //       sessionStorage.setItem('currentShift', JSON.stringify(myShift));
  //       setShift(myShift);
  //       window.dispatchEvent(new Event('currentShift'));
  //     }
  //   }
  //   setLoadingSessionStorage(false);
  // };

  const handleEarlyTimeOut = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedTime = format(currentDate, 'HH:mm:ss');
    const storeShift = sessionStorage.getItem('currentShift');

    if (!navigator.geolocation || !storeShift) return;

    try {

      handleConfirmation({
        title: "Early Time Out",
        text: "Are you sure you want to time out early?",
        confirmButtonText: "Yes, Time Out"
      }, async () => {
        if (storeShift) {
          const myShift = JSON.parse(storeShift);
          myShift.time_out = formattedTime;
          myShift.status = 'completed';


          // Get location samples
          const getPositionSample = () => new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
          });

          const positionSamples = await Promise.all(Array.from({ length: 3 }, () => getPositionSample()));
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
            time_out_latitude: latitude / positionSamples.length,
            time_out_longitude: longitude / positionSamples.length,
          };

          const totalHours = calculateDecimalHours(getCurrentDateForCalculation(), myShift.time_in, formattedTime);

          // const hasBreak = myShift.break_start !== "" && myShift.break_start !== "00:00:00";

          // const breakHours = hasBreak
          //   ? calculateDecimalHours(getCurrentDateForCalculation(), myShift.break_start, formattedTime)
          //   : 0;
          
          Object.assign(myShift, {
            total_hours:  totalHours,
            status: 'completed',
            ...avgCoords
          });

          const { payload } = await dispatch(updateDtrById(myShift));
          if (payload.success) {
            sessionStorage.setItem('currentShift', JSON.stringify(myShift));
            setShift(myShift);
            window.dispatchEvent(new Event('currentShift'));
            return true;
          }
        }
        return false;
      });
      
    } catch (error) {
      console.error("Error processing timeout:", error);
    }


  };

  const handleView = (dtr) => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedDtr(dtr);
    modal.show();
  };

 const handleOt = async (e) => {
    const { value, name } = e.target;
    e.preventDefault();
    setLoadingSessionStorage(true);

    const storeShift = sessionStorage.getItem('currentShift');
    if (storeShift) {
      const myShift = JSON.parse(storeShift);

      if (!myShift.time_out) {
        setNotification({ message: 'Need to time out first', type: 'error' });
        setLoadingSessionStorage(false);
        return;
      }

      if (!myShift.remarks) {
        const modalElement = modalDtrRemarks.current;
        const modal = new Modal(modalElement);
        modal.show();
        setLoadingSessionStorage(false);
        return;
      }

      myShift[name] = value;
      const { payload } = await dispatch(updateDtrById(myShift));

      if (payload.success) {
        sessionStorage.setItem('currentShift', JSON.stringify(myShift));
        setShift(myShift);
        window.dispatchEvent(new Event('currentShift'));
      }
    }
    setLoadingSessionStorage(false);
  };

  // submit dtr save to database
  const submitMyDtr = async (e) => {
    e.preventDefault();
    setLoadingSessionStorage(true);
    const storeShift = sessionStorage.getItem('currentShift');

    handleConfirmation({
      title: "Submit DTR",
      text: "Submit your DTR for Engineering Review?",
      confirmButtonText: "Submit"
    }, async () => {
      if (storeShift) {
        const myShift = JSON.parse(storeShift);
        if (myShift.status === 'pending') return false;

        if(getDepartmentLoggedIn() === 10) {
          myShift.status = 'for engineering review';
        } else {
          myShift.status = 'for approval';
        }
        
        const { payload } = await dispatch(updateDtrById(myShift));

        if (payload.success) {
          setShift([]);
          sessionStorage.removeItem('currentShift');
          window.dispatchEvent(new Event('currentShift'));
          return true;
        }
      }
      return false;
    });
  };

  const handleCameraModal = async (e) => {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
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
  };

  const timeComponents = getTimeComponents();
  const hasActiveShift = shift && Object.keys(shift).length > 0;

  useEffect(() => {
    console.log("hasActiveShift", hasActiveShift)
    console.log("shift", shift)
  }, [])
  

  return (
    <>
      {dtrLoading && <Loading />}
      
      {notification.message && (
        <FloatNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      <div className="dtr-container">
        {/* Header Section */}
        <div className="dtr-header">
          <div className="header-content">
            <div className="user-welcome">
              <h1 className="welcome-text">
                Welcome back, <span className="user-name">{getLoggedInFullname()}</span>
              </h1>
              <p className="date-text">{getCurrentDate()}</p>
            </div>
            
            <div className="time-display">
              <div className="digital-clock">
                <span className="time-main">{timeComponents.time}</span>
                <span className="time-seconds">:{timeComponents.seconds}</span>
                <span className="time-period">{timeComponents.period}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        {/* <div className="action-section">
          <div className="action-buttons">
            {hasActiveShift ? (
              <>
                {!shift.time_out || shift.time_out === '00:00:00' ? (
                  <button 
                    className="action-btn break-in-btn" 
                    onClick={(e) => handleBreakAction(e, 'break_start')}
                    disabled={loadingSessionStorage}
                  >
                    <div className="btn-content">
                      <i className="fas fa-coffee btn-icon" aria-hidden="true"></i>
                      <span>Break In</span>
                    </div>
                  </button>
                ) : !shift.break_end || shift.break_end === '00:00:00' ? (
                  <button 
                    className="action-btn break-out-btn" 
                    onClick={(e) => handleBreakAction(e, 'break_end')}
                    disabled={loadingSessionStorage}
                  >
                    <div className="btn-content">
                      <i className="fas fa-play btn-icon" aria-hidden="true"></i>
                      <span>Break Out</span>
                    </div>
                  </button>
                ) : (
                  <button 
                    className="action-btn time-out-btn" 
                    onClick={timeOut} 
                    disabled={accessOut || loadingSessionStorage}
                  >
                    <div className="btn-content">
                      <i className="fas fa-clock btn-icon" aria-hidden="true"></i>
                      <span>Time Out</span>
                    </div>
                  </button>
                )}
                
                <button 
                  className="action-btn early-out-btn" 
                  onClick={handleEarlyTimeOut} 
                  disabled={accessOut || loadingSessionStorage}
                >
                  <div className="btn-content">
                    <i className="fas fa-door-open btn-icon" aria-hidden="true"></i>
                    <span>Early Time Out</span>
                  </div>
                </button>
              </>
            ) : (
              <button 
                className="action-btn time-in-btn primary" 
                onClick={handleCameraModal}
                disabled={loadingSessionStorage}
              >
                <div className="btn-content">
                  <i className="fas fa-camera btn-icon" aria-hidden="true"></i>
                  <span>Time In</span>
                </div>
              </button>
            )}
          </div>
        </div> */}

        <div className="action-section">
          <div className="action-buttons">
            {hasActiveShift ? (
              <>
                {/* Show Time Out button only if not yet timed out */}
                {!shift.time_out || shift.time_out === '00:00:00' ? (
                  <>
                    <button 
                      className="action-btn time-out-btn" 
                      onClick={timeOut} 
                      disabled={accessOut || loadingSessionStorage}
                    >
                      <div className="btn-content">
                        <i className="fas fa-clock btn-icon" aria-hidden="true"></i>
                        <span>Time Out</span>
                      </div>
                    </button>

                    {/* <button 
                      className="action-btn early-out-btn" 
                      onClick={handleEarlyTimeOut} 
                      disabled={accessOut || loadingSessionStorage}
                    >
                      <div className="btn-content">
                        <i className="fas fa-door-open btn-icon" aria-hidden="true"></i>
                        <span>Early Time Out</span>
                      </div>
                    </button> */}
                  </>
                ) : null}
              </>
            ) : (
              // Show Time In if no active shift
              <button 
                className="action-btn time-in-btn primary" 
                onClick={handleCameraModal}
                disabled={loadingSessionStorage}
              >
                <div className="btn-content">
                  <i className="fas fa-camera btn-icon" aria-hidden="true"></i>
                  <span>Time In</span>
                </div>
              </button>
            )}
          </div>
        </div>


        {/* Current Shift Section */}
        <div className="current-shift-section">
          <CurrentShift 
            shiftState={{ shift, setShift }}
            handleOt={handleOt}
            submitMyDtr={submitMyDtr}
          />
        </div>

        {/* Weekly DTR Section */}
        <div className="weekly-dtr-section">
          <WeekDtr
            dtr={weeklyDtr}
            handleViewDetails={handleView}
          />
        </div>
      </div>

      {/* Modals */}
      <AccessCamera
        cameraModalRef={modalCameraRef}
        submitTimeIn={submitTimeIn}
        videoRef={videoRef}
        dtrPostLoading={dtrPostLoading}
        capture={capture}
        closeCameraModal={closeCameraModal}
        user_id={getLoggedInID()}
      />

      <DtrDetailsModal 
        selectedDtr={selectedDtr}
        modalRef={modalRef}
      />

      <DtrRemarksModal 
        modalDtrRemarks={modalDtrRemarks}
      />
    </>
  );
};

export default Home;