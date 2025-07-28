import React, { useState, useEffect } from 'react'
import SideNavigation from '../SideNavigation';
import { useNavigate } from 'react-router-dom';
import MobileFirstNavigation from '../MobileFirstNavigation'
import { Outlet } from 'react-router-dom';
import { getLoggedInData } from '../../customs/global/manageLocalStorage'; 

const BaseTemplate = () => {
    const [showSideNav, setShowSideNav] = useState(false);

    // const navigate = useNavigate();
  
    // useEffect(() => {
    // //   console.log("logged in data", getDepartmentLoggedIn());
    //   if (!getLoggedInData() || getLoggedInData().department !== 1) {
    //     navigate('/'); // Redirect to home page if not admin
    //   }
    // }, [navigate])
  
    return (
      <>
      <div className="wrapper">
          <SideNavigation handleToggle={ () => setShowSideNav(!showSideNav) } isExpanded={showSideNav} showSideNav={showSideNav} />
  
          <div className="main p-3">
           <MobileFirstNavigation handleToggle={ () => setShowSideNav(!showSideNav) }  className="mb-3"/>
              <Outlet />
          </div>
  
      </div>
      </>
    )
}

export default BaseTemplate