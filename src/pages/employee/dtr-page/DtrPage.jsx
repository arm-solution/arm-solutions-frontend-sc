import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns';
import './DtrPage.css';
import { getLoggedInFullname, getLoggedInID } from '../../../customs/global/manageLocalStorage';
import { dateFormatted } from '../../../customs/global/manageDates'; 
import { useDispatch, useSelector } from 'react-redux';
import { postDtr, getDtrById, updateDtrById } from '../../../store/features/dtrSlice';
import Loading from '../../../components/loading-spinner/Loading';
import DataTable from '../../../components/DataTable';
import CurrentShift from '../../../components/current-shift-container/CurrentShift';
import { errorDialog } from '../../../customs/global/alertDialog';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import DtrDetailsModal from '../../../components/modals-forms/dtr-details/DtrDetailsModal';
import { handleConfirmation } from '../../../customs/global/alertDialog';

const Home = () => {

  const modalRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  // const [myDtr, setMyDtr] = useState([])
  const [error, setError] = useState(null);
  const [shift, setShift] = useState([])
  const [selectedDtr, setSelectedDtr] = useState(null);
  const [loadingSessionStorage, setLoadingSessionStorage] = useState(false)

  const dispatch = useDispatch();

  const { dtr, loading: dtrLoading } = useSelector(state => state.dtr);

  const columns = [
    { header: 'Shift Date', accessor: 'shift_date' },
    { header: 'Time In', accessor: 'time_in' },
    { header: 'Time Out', accessor: 'time_out' },
    { header: 'Status', accessor: 'status' },
  ];


  useEffect(() => {
      dispatch(getDtrById(getLoggedInID()));
  }, [dispatch]);  

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
    const formattedTime = format(currentDate, 'hh:mm:ss');
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          shift_date: formattedDate,
          time_in: formattedTime,
          break_start: '',
          break_end: '',
          user_id: getLoggedInID(),
          status: 'pending'
        }; 
  
        const { payload } = await dispatch(postDtr(coords));
  
        if (payload.success) {
          sessionStorage.setItem('currentShift', JSON.stringify({ ...coords, id: payload.lastid }));
          setShift(coords);
          window.dispatchEvent(new Event('currentShift'));
        } else {
          errorDialog("Cannot save your data, please report this to the technical team");
        }
  
        setLoadingSessionStorage(false); // End loading
      }, (error) => {
        showError(error);
        setLoadingSessionStorage(false); // End loading if geolocation fails
      });
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingSessionStorage(false); // End loading if geolocation is not supported
    }
  };


  const timeOut = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    // const formattedDate = dateFormatted(currentDate);
    const formattedTime = format(currentDate, 'hh:mm:ss');

    const storeCoords = sessionStorage.getItem('currentShift');
    if(storeCoords) {
      const coords = JSON.parse(storeCoords)
      coords.time_out = formattedTime;

      const { payload }  = await dispatch(updateDtrById(coords));

      if(payload.success) {
        // sessionStorage.setItem('currentShift', JSON.stringify(coords));
        setShift([]);
        sessionStorage.removeItem('currentShift'); // Remove from sessionStorage
        window.dispatchEvent(new Event('currentShift')); // Trigger the custom event
      }

    }
  }


  const handleBreakIn = (e) => {
    e.preventDefault();
    setLoadingSessionStorage(true);

    const currentDate = new Date(); 
    const formattedTime = format(currentDate, 'hh:mm:ss');

    const storeCoords = sessionStorage.getItem('currentShift');

    if(storeCoords) {
      const coords = JSON.parse(storeCoords);
      coords.break_start = formattedTime;

      sessionStorage.setItem('currentShift', JSON.stringify(coords));
      setShift(coords);

      window.dispatchEvent(new Event('currentShift'));

      setLoadingSessionStorage(false);
    }

    setLoadingSessionStorage(false);
  }

  const handleBreakOut = (e) => {
    e.preventDefault();

    setLoadingSessionStorage(true);

    const currentDate = new Date(); 
    const formattedTime = format(currentDate, 'hh:mm:ss');

    const storeCoords = sessionStorage.getItem('currentShift');

    if(storeCoords) {
      const coords = JSON.parse(storeCoords);
      coords.break_end = formattedTime;

      sessionStorage.setItem('currentShift', JSON.stringify(coords));
      setShift(coords);
      
      window.dispatchEvent(new Event('currentShift'));

      setLoadingSessionStorage(false);
    }

    setLoadingSessionStorage(false);
  }

  const handleEarlyTimeOut = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedTime = format(currentDate, 'hh:mm:ss');

    const storeCoords = sessionStorage.getItem('currentShift');

    handleConfirmation({
      title: "",
      text: "",
      icon: "",
      confirmButtonText: "",
      cancelButtonText: "",
      confirmationTitle: "",
      confirmationText: "",
      successTitle: "", 
      successText: ""
      }, async () => {

        if(storeCoords) {
          const coords = JSON.parse(storeCoords)
          coords.time_out = formattedTime;
    
          const { payload }  = await dispatch(updateDtrById(coords));

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

  const handleDelete = () => {}
   
  return (
    <>
    { dtrLoading && ( <Loading /> ) }

    <div className="row">

      <div className="col-md-6">
      <h1>Real-Time Clock</h1>
      <h2>{currentTime.toLocaleTimeString()}</h2>

      </div>
      <div className="col-md-6 text-end">
      <h1>Welcome <span style={{ textTransform: 'uppercase', color: 'green' }}>{ getLoggedInFullname() }</span></h1>
      </div>

    </div>

    <div className="row">
    { shift && Object.keys(shift).length > 0 ? (
    <>
      {shift.break_start === '' ? (
        <button className="btn btn-warning time-in-btn" onClick={(e) => handleBreakIn(e)}>Break In</button>
      ) : (
        shift.break_end === '' ? (
          <button className="btn btn-warning time-in-btn" onClick={(e) => handleBreakOut(e)}>Break Out</button>
        ) : (
          <button className="btn btn-danger time-in-btn" onClick={(e) => timeOut(e)}>Time Out</button>
        )
      )}
      <button className='btn btn-success time-in-btn' onClick={(e) => handleEarlyTimeOut(e)}>Early Time Out</button>
    </>
  ) : (
    <button className="btn btn-primary time-in-btn" onClick={getTimeIn} disabled={loadingSessionStorage}>
      {loadingSessionStorage ? 'Loading...' : 'Time In'}
    </button>
  )
}

    </div>

    <div className="row mt-4">
      <CurrentShift 
      shiftState={{ shift, setShift }}
      />
    </div>

    <div className="mt-5">
      <DataTable
        data={dtr}
        columns={columns}
        actions={{ handleView, handleDelete }}
        perPage={10}
        showAddButtonAndSearchInput={{ searchInput: false, addButton: false }}
        tableLabel='Records'
        deleteAccess={false}
        headerColor='table-success'
      />
    </div>

    <DtrDetailsModal 
      selectedDtr={selectedDtr}
      modalRef={modalRef}
    />


    </>
  )
}

export default Home