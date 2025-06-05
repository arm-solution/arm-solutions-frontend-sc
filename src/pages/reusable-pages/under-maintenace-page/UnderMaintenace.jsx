import React from 'react';
import './UnderMaintenace.css';
import maintenanceIcon from './../../../assets/icon/maintenance.png'

const UnderMaintenace = () => {
  return (
    <>
      <div className="under-maintenance">
        <div className="maintenace-container">
          <img src={maintenanceIcon} alt="" />
          <h1>Under Maintenance</h1>
          <p>We are currently performing scheduled maintenance. <br /> We'll be back online shortly!</p>
        </div>
      </div>
    </>
  )
}

export default UnderMaintenace