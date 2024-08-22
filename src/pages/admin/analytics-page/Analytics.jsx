import React from 'react'
import Charts from '../../../components/Charts'
import './Analytics.css'
import DashboardCard from '../../../components/dashboard-card/DashboardCard'

const Analytics = () => {
  return (
    <>
      <div className="card-container">
        <DashboardCard />
        <DashboardCard headerColor='#A52A2A' />
        <DashboardCard headerColor='#FF6347' />
        <DashboardCard headerColor='#ADD8E6' />
      </div>

      <div className="container mt-5">
          <div className="mt-4 p-5 bg-secondary text-white rounded">
          <h1>Jumbotron Example</h1> 
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..</p> 
          </div>
      </div>

      <div className="graph-container">
        <div className="graph">


          <div className="card">
            <div className="card-body">
              <Charts />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Analytics