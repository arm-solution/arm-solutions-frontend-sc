import React, { useEffect, useState } from 'react'
import Map from '../../../components/Map'
import './Maps.css'


const Maps = () => {


  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };


  return (
    <>
      <div className="container-fluid mt-5 ">
        <div className="row mobile">
          <div className="col col-md-3">
            <h3 className='text-center info-label mb-4'>Information</h3>

            <div className="row">
              <b>Full Name</b>
            </div>

            <div className="row mt-3">
              <b>Department</b>
            </div>

            <div className="row mt-3">

            <label htmlFor="datePicker" className="form-label">Select Date</label>
            <input
              type="date"
              id="datePicker"
              className="form-control"
              value={selectedDate}
              onChange={handleDateChange}
            />

            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <button className="btn btn-success">Search</button>
              </div>
            </div>

          </div>

          <div className="col col-md-9 mt-3">
            <Map coordinates={{ long: 0, lat: 0 }}/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Maps