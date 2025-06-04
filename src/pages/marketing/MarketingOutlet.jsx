import React, { useState }  from 'react';
import SideNavigation from '../../components/SideNavigation';
import MobileFirstNavigation from '../../components/MobileFirstNavigation';
import { Outlet } from 'react-router-dom';

const MarketingOutlet = () => {
    const [showSideNav, setShowSideNav] = useState(false)

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

export default MarketingOutlet