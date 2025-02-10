
import React, { useState } from 'react';

const FilterAnalytics = ({ onFilter }) => {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleFilterChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleApplyFilter = () => {
    onFilter(dateRange);
  };
  return (
    <>

    <div className="container-fluid">
        <div className="p-5 text-white rounded d-flex justify-content-between align-items-center">
          <h1>Arm Solution Enterprises Dashboard</h1>
          <div className="filter-dropdowns">
            <div className="form-group-inline">
              <label htmlFor="year-select">Date From:</label>
              <input type="date" className='form-control' name="startDate" value={dateRange.startDate} onChange={handleFilterChange} style={{ fontSize: '14px'}} />
            </div>
            <div className="form-group-inline">
              <label htmlFor="month-select">To:</label>
              <input type="date" className='form-control' name="endDate" value={dateRange.endDate} onChange={handleFilterChange} style={{ fontSize: '14px'}} />
            </div>
            <div className="form-group-inline">
              <button className="btn btn-search btn-primary" onClick={handleApplyFilter}>
                <i className="fas fa-search"></i> {/* Font Awesome search icon */}
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterAnalytics
