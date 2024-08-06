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