import React from 'react'
import './AboutUsHeader.css';
import headerImage from './../../assets/images/fire-ext.jpg';

const AboutUsHeader = () => {
  return (
    <>
    <div className="overlay-container" style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="text-overlay">
        ABOUT US
      </div>
    </div>
    </>
  )
}

export default AboutUsHeader