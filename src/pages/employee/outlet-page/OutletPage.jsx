import React, { useState } from 'react'
import Map from '../../../components/Map'
import "./OutletPage.css";
import { Outlet } from 'react-router-dom';
import SideNavigation from '../../../components/SideNavigation'

const OutletPage = () => {
  const [showSideNav, setShowSideNav] = useState(false)
  return (
    <div className="wrapper">
        <SideNavigation handleToggle={ () => setShowSideNav(!showSideNav) } isExpanded={showSideNav} showSideNav={showSideNav} />

        <div className="main p-3">

                <div className="container mt-5 bar-container">
                    <Outlet />
                </div>
      </div>
    </div>
  )
}

export default OutletPage