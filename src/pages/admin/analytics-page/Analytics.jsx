import React, { useEffect } from 'react'
import Charts from '../../../components/Charts'
import './Analytics.css'
import DashboardCard from '../../../components/dashboard-card/DashboardCard'
import FilterAnalytics from '../../../components/filter-analytics/FilterAnalytics'
import { useDispatch, useSelector } from 'react-redux'
import { getManPower } from '../../../store/features/dashboardDataSlice'

const Analytics = () => {

  const dispatch = useDispatch();

  const { manpower, loading, message, isSuccess } = useSelector(state => state.dasboardData);

  useEffect(() => {

    dispatch(getManPower());

  }, [dispatch])
  

  return (
    <>

      <FilterAnalytics />
      
      <div className="card-container">
        {/* <DashboardCard /> */}
        <DashboardCard headerColor='#0D92F4' cardTitle="Total Sales" cardValue="₱183,430,087.52" />
        <DashboardCard headerColor='#77CDFF' cardTitle="Total Projects" cardValue="520" />
        <DashboardCard headerColor='#F95454' cardTitle="Ongoing Projects" cardValue="205" />
        <DashboardCard headerColor='#C62E2E' cardTitle="Due Projects" cardValue="12" />
        <DashboardCard
         headerColor='#179BAE'
         cardTitle="Active Manpower"
         cardValue="120" 
         data={ manpower[0].TotalManpower }
        />
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