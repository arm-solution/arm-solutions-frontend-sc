import React, { useState } from 'react'
import "./OutletPage.css";
import { Outlet } from 'react-router-dom';
import SideNavigation from '../../../components/SideNavigation'
import MobileFirstNavigation from '../../../components/MobileFirstNavigation';
import { useScreenWidth } from './../../../customs/global/forMobile.js'; 

const OutletPage = () => {
  const [showSideNav, setShowSideNav] = useState(false)
  return (
    <div className="wrapper">

   

        <SideNavigation handleToggle={ () => setShowSideNav(!showSideNav) } isExpanded={showSideNav} showSideNav={showSideNav} />
      

        <div className="main p-3">
        <MobileFirstNavigation handleToggle={ () => setShowSideNav(!showSideNav) } isExpanded={showSideNav} showSideNav={showSideNav}/>

                <div className="container mt-5 bar-container">
                    <Outlet />
                </div>
      </div>
    </div>
  )
}

export default OutletPage