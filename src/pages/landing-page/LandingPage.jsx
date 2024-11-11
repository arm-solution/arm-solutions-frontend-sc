import React, { useState } from 'react'
import './LandingPage.css';
import Carousel from './../../components/carousel-image/Carousel'
import Clients from '../../components/clients/Clients';
import LandingFooter from './../../components/footer/LandingFooter';
import LandingNavbar from './../../components/landing-navigation/LandingNavbar';
import ServiceCardSlides from '../../components/services/ServiceCardSlides';
import OnTopButton from '../../components/ontop-button/OnTopButton';
import WhyArms from '../../components/why-arms/WhyArms';
import Profile from '../company-profile-page/Profile';
import CompanyHistory from '../../components/company-history/CompanyHistory';
import MessengerChat from '../../components/MessengerChat';

const LandingPage = () => {
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleAboutUsPage = () => {
    setShowAboutUs(true);
  }

  const handleBackToLandingPage = () => {
    setShowAboutUs(false);
  }

 return (
    <>
      <LandingNavbar handleAboutUsPage={handleAboutUsPage} handleBackToLandingPage={handleBackToLandingPage}/>
      {showAboutUs ? (
        <>        
        <Profile />
        <CompanyHistory />
        </>
      ) : (
        <>
        <Carousel />
        <ServiceCardSlides />
        <Clients />
        <WhyArms />
        <MessengerChat />
        {/* <OnTopButton  /> */}
        </>
      )}


      <LandingFooter />
    </>
  )
}

export default LandingPage