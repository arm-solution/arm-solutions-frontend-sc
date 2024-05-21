import React, { useState } from 'react'
import SideNavigation from '../../components/SideNavigation'
import './../../customs/AdminDashboard.css';
import MobileFirstNavigation from '../../components/MobileFirstNavigation'
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false)


  const handleToggle = () => {
    setShowSideNav(!showSideNav);
    setIsExpanded(!isExpanded);
  };

  // const handleMobileNav = () => {
  //   setShowSideNav(!showSideNav);
  //   setIsExpanded(!isExpanded);
  // } 

  return (
    <>
    <div className="wrapper">
        <SideNavigation handleToggle={handleToggle} isExpanded={isExpanded} showSideNav={showSideNav} />

        <div className="main p-3">
         <MobileFirstNavigation handleToggle={handleToggle} className="mb-3"/>

      
            <div className="text-center mt-5">
                <h1>
                    Sidebar Bootstrap 5

                    <Outlet />

                </h1>
            </div>
        </div>

    </div>
    </>
  )
}

export default AdminDashboard