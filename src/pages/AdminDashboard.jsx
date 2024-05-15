import React, { useState } from 'react'
import SideNavigation from '../components/SideNavigation'
import './../customs/AdminDashboard.css';
import MobileFirstNavigation from '../components/MobileFirstNavigation';

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
      <MobileFirstNavigation handleToggle={handleToggle} />

      
            <div className="text-center">
                <h1>
                    Sidebar Bootstrap 5

                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.
                    SVG is supported by all major browsers. With react-icons, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.

                </h1>
            </div>
        </div>

    </div>
    </>
  )
}

export default AdminDashboard