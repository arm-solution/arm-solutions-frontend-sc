import React, { useState, useEffect } from 'react';
import SideNavigation from '../../../components/SideNavigation';
import { useNavigate } from 'react-router-dom';
import MobileFirstNavigation from '../../../components/MobileFirstNavigation';
import { getLoggedInData } from '../../../customs/global/manageLocalStorage';
import { Outlet } from 'react-router-dom';

const EmployeesHomePage = () => {

    const [showSideNav, setShowSideNav] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!getLoggedInData() || getLoggedInData().user_type !== 'employee') {
          navigate('/'); // Redirect to home page if not admin
        }
      }, [navigate])
    

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

export default EmployeesHomePage