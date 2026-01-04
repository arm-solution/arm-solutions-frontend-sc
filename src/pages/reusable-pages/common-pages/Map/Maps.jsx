import React, { useEffect, useState } from 'react'
import Map from '../../../../components/Map'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../../store/features/userSlice';
import { getAllDtrWithDateRange } from '../../../../store/features/dtrSlice';
import './Maps.css'

const Maps = () => {

  const myLocation = useLocation();
  const dispatch = useDispatch();

  const { userById, loading } = useSelector(state => state.users);
  const { dtrWithDateRange } = useSelector(state => state.dtr);

  const [userId, setUserId] = useState(0)
  const [selectedDate, setSelectedDate] = useState({
    date_start: '',
    date_end: '',
    status: ['approved', 'for approval', 'rejected', 'for engineering review']
  });

  useEffect(() => {
    const getUserInformation = async () => {
      const queryParams = new URLSearchParams(myLocation.search);
      const data = JSON.parse(decodeURIComponent(queryParams.get('data')));
      
      if(data) {
        setUserId(data.user_id);
        await dispatch(getUserById(data.user_id))
      }
    }

    getUserInformation();
  }, [dispatch])
  

const handleDateChange = (e) => {
  const { name, value } = e.target;
  setSelectedDate((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleSearch = async () => {

  if(selectedDate.date_from === '' || selectedDate.date_to === '') {
    alert("Need to input date");
    return;
  }
  if(userId) {
   await dispatch(getAllDtrWithDateRange({
      userId,
      dtrParams: selectedDate
    }));

  } else {
    alert("Need to provide user id");
    return
  }

}

  return (
    <>
      <div className="maps-wrapper">
        <div className="container-fluid">
          <div className="row mobile g-4">
            {/* Information Panel */}
            <div className="col-12 col-lg-3">
              <div className="info-panel">
                <div className="panel-header">
                  <h3 className='panel-title'>
                    <i className="bi bi-info-circle me-2"></i>
                    Information
                  </h3>
                </div>
                
                <div className="panel-body">
                  <div className="info-field">
                    <label className="field-label">
                      <i className="bi bi-person me-2"></i>
                      Full Name
                    </label>
                    <div className="field-content">
                      { loading ? 'loading...' : `${userById?.data?.firstname} ${userById?.data?.lastname}`}
                    </div>
                  </div>

                  <div className="info-field">
                    <label className="field-label">
                      <i className="bi bi-building me-2"></i>
                      Department
                    </label>
                    <div className="field-content">
                      { loading ? 'loading...' : userById?.data?.department_details?.name }
                    </div>
                  </div>

                  <div className="info-field">
                    <label htmlFor="datePicker" className="field-label">
                      <i className="bi bi-calendar3 me-2"></i>
                      From
                    </label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="datePicker"
                        name="date_start"
                        className="form-control date-input"
                        value={selectedDate.date_start}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>

                  <div className="info-field">
                    <label htmlFor="datePicker" className="field-label">
                      <i className="bi bi-calendar3 me-2"></i>
                      To
                    </label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="datePicker"
                        name="date_end"
                        className="form-control date-input"
                        value={selectedDate.date_end}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>

                  <div className="search-section">
                    <button className="btn search-btn" onClick={handleSearch}>
                      <i className="bi bi-search me-2"></i>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="col-12 col-lg-9">
              <div className="map-section">
                <div className="map-header">
                  <h4 className="map-title">
                    <i className="bi bi-geo-alt me-2"></i>
                    Location Map
                  </h4>
                </div>
                <div className="map-wrapper">
                  <Map dtrWithDateRange={dtrWithDateRange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Maps