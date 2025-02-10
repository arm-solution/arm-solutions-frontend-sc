import React, { useEffect, useState } from 'react'
import Charts from '../../../components/Charts'
import './Analytics.css'
import DashboardCard from '../../../components/dashboard-card/DashboardCard'
import FilterAnalytics from '../../../components/filter-analytics/FilterAnalytics'
import { useDispatch, useSelector } from 'react-redux'
import { getManPower, getTotalSales, getTotalProjects, getOngoingProjects, getTotalInventory, getTopSales, getDueProjects } from '../../../store/features/dashboardDataSlice'
import { currencyFormat } from '../../../customs/global/currency'

const Analytics = () => {

  const dispatch = useDispatch();

  const { manpower, totalsales, totalprojects, ongoingprojects, totalinventory, topsales, dueprojects, loading, message, isSuccess } = useSelector(state => state.dasboardData);

  const [dateRange, setDateRange] = useState(null); // Null for first load

  useEffect(() => {
    if (dateRange) {
      // If dateRange is selected, fetch filtered data
      dispatch(getManPower());
      dispatch(getTotalSales(dateRange));
      dispatch(getTotalProjects());
      dispatch(getOngoingProjects());
      dispatch(getTotalInventory());
      dispatch(getTopSales());
      dispatch(getDueProjects());
    } else {
      // First load - fetch all data
      dispatch(getManPower());
      dispatch(getTotalSales());
      dispatch(getTotalProjects());
      dispatch(getOngoingProjects());
      dispatch(getTotalInventory());
      dispatch(getTopSales());
      dispatch(getDueProjects());
    }
  }, [dispatch, dateRange]);
  

  return (
    <>

      <FilterAnalytics onFilter={setDateRange} />
      
      <div className="card-container">
        {/* <DashboardCard /> */}
        <DashboardCard
         headerColor='#0D92F4'
         cardTitle="Total Sales"
         cardValue="₱183,430,087.52" 
         data={ loading ? "Loading..." : (totalsales.length > 0 && totalsales[0]?.TotalSales ? currencyFormat(totalsales[0].TotalSales) : "₱0.00") }
         />
        <DashboardCard 
         headerColor='#77CDFF' 
         cardTitle="Total Projects" 
         cardValue="520" 
         data={ loading ? "Loading..." : totalprojects[0]?.TotalProjects ? totalprojects[0]?.TotalProjects : 0 }
        />
        <DashboardCard
         headerColor='#F95454' 
         cardTitle="Ongoing Projects" 
         cardValue="205" 
         data={ loading ? "Loading..." : ongoingprojects[0]?.TotalProjects ? ongoingprojects[0]?.TotalProjects : 0 }
        />
        <DashboardCard
         headerColor='#C62E2E' 
         cardTitle="Due Projects" 
         cardValue="12" 
         data={ loading ? "Loading..." : dueprojects[0]?.DueProjects ? dueprojects[0]?.DueProjects : 0 }
        />
        <DashboardCard
         headerColor='#179BAE'
         cardTitle="Active Manpower"
         cardValue="120" 
         data={ loading ? "Loading..." : manpower[0]?.TotalManpower ? manpower[0]?.TotalManpower : 0 }
        />
        <DashboardCard
         headerColor='#FF8343' 
         cardTitle="Total Inventory" 
         cardValue="358" 
         data={ loading ? "Loading..." : totalinventory[0]?.totalInventory ? totalinventory[0]?.totalInventory : 0 }
        />
      </div>


      <div className="row mt-5">
        {/* Column for Top 3 Ongoing Projects */}
        <div className="col-md-4">
          <div className="card p-3 bg-light">
            <h5>Top 3 Ongoing Projects</h5>
            <ul>
              <li className="mt-4">
                <DashboardCard
                 headerColor='#0B192C' 
                 cardTitle={ loading ? "Loading..." : topsales[0]?.client_name ? topsales[0]?.client_name : 0 }
                 cardDescription={ loading ? "Loading..." : topsales[0]?.completion_date ? `Project Target End: ${topsales[0]?.completion_date}` : 0 }
                 data={ loading ? "Loading..." : topsales[0]?.grand_total ? currencyFormat(topsales[0]?.grand_total) : 0 }
                />
              </li>
              <li className="mt-4">
                <DashboardCard
                 headerColor='#1E3E62' 
                 cardTitle={ loading ? "Loading..." : topsales[1]?.client_name ? topsales[1]?.client_name : 0 }
                 cardDescription={ loading ? "Loading..." : topsales[1]?.completion_date ? `Project Target End: ${topsales[1]?.completion_date}` : 0 }
                 data={ loading ? "Loading..." : topsales[1]?.grand_total ? currencyFormat(topsales[1]?.grand_total) : 0 }
                />
              </li>
              <li className="mt-4">
                <DashboardCard
                 headerColor='#FF6500' 
                 cardTitle={ loading ? "Loading..." : topsales[2]?.client_name ? topsales[2]?.client_name : 0 }
                 cardDescription={ loading ? "Loading..." : topsales[2]?.completion_date ? `Project Target End: ${topsales[2]?.completion_date}` : 0 }
                 data={ loading ? "Loading..." : topsales[2]?.grand_total ? currencyFormat(topsales[2]?.grand_total) : 0 }
                />
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