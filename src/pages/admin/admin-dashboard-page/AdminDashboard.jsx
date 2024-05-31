import React, { useState } from 'react'
import SideNavigation from '../../../components/SideNavigation'
import './AdminDashboard.css';
import MobileFirstNavigation from '../../../components/MobileFirstNavigation'
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [showSideNav, setShowSideNav] = useState(false)


  return (
    <>
    <div className="wrapper">
        <SideNavigation handleToggle={ () => setShowSideNav(!showSideNav) } isExpanded={showSideNav} showSideNav={showSideNav} />

        <div className="main p-3">
         <MobileFirstNavigation handleToggle={ () => setShowSideNav(!showSideNav) }  className="mb-3"/>

      
            {/* <div className="text-center mt-5" style={{ border: '1px solid red' }}>
            </div> */}
                <div className="container mt-5 bar-container">
                    <Outlet />
                </div>
        </div>

    </div>
    </>
  )
}

export default AdminDashboard