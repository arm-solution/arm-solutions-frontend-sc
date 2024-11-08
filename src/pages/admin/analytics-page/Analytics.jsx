import React from 'react'
import Charts from '../../../components/Charts'
import './Analytics.css'
import DashboardCard from '../../../components/dashboard-card/DashboardCard'

const Analytics = () => {
  return (
    <>

      <div className="container-fluid">
        <div className="p-5 text-white rounded d-flex justify-content-between align-items-center">
          <h1>Arm Solution Enterprises Dashboard</h1>
          <div className="filter-dropdowns">
            <div className="form-group-inline">
              <label htmlFor="year-select">Year:</label>
              <select id="year-select" className="form-control">
                <option value="All">All</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="form-group-inline">
              <label htmlFor="month-select">Month:</label>
              <select id="month-select" className="form-control">
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
              </select>
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

      
      <div className="card-container">
        {/* <DashboardCard /> */}
        <DashboardCard headerColor='#0D92F4' cardTitle="Total Sales" cardValue="₱183,430,087.52" />
        <DashboardCard headerColor='#77CDFF' cardTitle="Total Projects" cardValue="520" />
        <DashboardCard headerColor='#F95454' cardTitle="Ongoing Projects" cardValue="205" />
        <DashboardCard headerColor='#C62E2E' cardTitle="Due Projects" cardValue="12" />
        <DashboardCard headerColor='#179BAE' cardTitle="Active Manpower" cardValue="120" />
        <DashboardCard headerColor='#FF8343' cardTitle="Total Inventory" cardValue="358" />
      </div>


      <div className="row mt-5">
        {/* Column for Top 3 Ongoing Projects */}
        <div className="col-md-4">
          <div className="card p-3 bg-light">
            <h5>Top 3 Ongoing Projects</h5>
            <ul>
              <li className="mt-4">
                <DashboardCard headerColor='#0B192C' cardTitle="San Miguel Corporation" cardValue="₱7,042,000.00" cardDescription="Project Target End: 12/30/2024" />
              </li>
              <li className="mt-4">
                <DashboardCard headerColor='#1E3E62' cardTitle="CDO Foodsphere" cardValue="₱4,230,000.50" cardDescription="Project Target End: 12/30/2024" />
              </li>
              <li className="mt-4">
                <DashboardCard headerColor='#FF6500' cardTitle="GOTOH Philippines Inc." cardValue="₱2,054,000.00" cardDescription="Project Target End: 12/30/2024" />
              </li>
            </ul>
          </div>
        </div>

        {/* Column for Project Completion Graph */}
        <div className="col-md-8">
          <div className="card p-3 bg-light">
            <h5>Project Completion Graph</h5>
            <div className="graph-container mt-4">
              <div className="graph">
                <div className="card">
                  <div className="card-body">
                    <Charts />
                  </div>
                </div>
              </div>
            </div>

            <h5 className='my-4'>Employee Weekly Monitoring Board</h5>
            <div className="graph-container">
              <div className="graph">
                <div className="card">
                  <div className="card-body">
                    <Charts />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Analytics