import React, { useState, useEffect } from 'react'
import SideNavigation from '../../../components/SideNavigation';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import MobileFirstNavigation from '../../../components/MobileFirstNavigation'
import { Outlet } from 'react-router-dom';
import { getLoggedInData } from '../../../customs/global/manageLocalStorage'; 

const AdminDashboard = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getLoggedInData() || getLoggedInData().user_type !== 'admin') {
      navigate('/'); // Redirect to home page if not admin
    }
  }, [navigate])
  

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

export default AdminDashboard