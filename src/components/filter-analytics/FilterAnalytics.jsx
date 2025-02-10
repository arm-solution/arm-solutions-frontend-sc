import React from 'react'

const FilterAnalytics = () => {
  return (
    <>

    <div className="container-fluid">
        <div className="p-5 text-white rounded d-flex justify-content-between align-items-center">
          <h1>Arm Solution Enterprises Dashboard</h1>
          <div className="filter-dropdowns">
            <div className="form-group-inline">
              <label htmlFor="year-select">Date From:</label>
              {/* <select id="year-select" className="form-control">
                <option value="All">All</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select> */}
              <input type="date" className="form-control" name="filterFrom" id="filterFrom" style={{ fontSize: '14px'}} />
            </div>
            <div className="form-group-inline">
              <label htmlFor="month-select">To:</label>
              {/* <select id="month-select" className="form-control">
                <option value="All">All</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select> */}
              <input type="date" className="form-control" name="filterTo" id="filterTo" style={{ fontSize: '14px'}} />
            </div>
            <div className="form-group-inline">
              <button className="btn btn-search btn-primary">
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