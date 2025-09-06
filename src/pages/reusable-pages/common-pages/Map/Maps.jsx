import React, { useEffect, useState } from 'react'
import Map from '../../../../components/Map'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../../store/features/userSlice';
import './Maps.css'

const Maps = () => {
  const navigate = useNavigate();

  const myLocation = useLocation();
  const dispatch = useDispatch();

  const { userById, loading } = useSelector(state => state.users);

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const getUserInformation = async () => {
      const queryParams = new URLSearchParams(myLocation.search);
      const data = JSON.parse(decodeURIComponent(queryParams.get('data')));
      
      if(data) {
        await dispatch(getUserById(data.user_id))
      }
    }

    getUserInformation();
  }, [dispatch])
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

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
                      Select Date
                    </label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="datePicker"
                        className="form-control date-input"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>

                  <div className="search-section">
                    <button className="btn search-btn">
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
                  <Map coordinates={{ long: 0, lat: 0 }}/>
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