import React from 'react'
import './LandingPage.css';
import Carousel from './../../components/carousel-image/Carousel'
import Clients from '../../components/clients/Clients';
import LandingFooter from './../../components/footer/LandingFooter';
import LandingNavbar from './../../components/landing-navigation/LandingNavbar';
import ServiceCardSlides from '../../components/services/ServiceCardSlides';
import OnTopButton from '../../components/ontop-button/OnTopButton';
// import MessengerChat from '../../components/MessengerChat';

const LandingPage = () => {
  const handleClick = () => {
    alert('Floating button clicked!');
  };

  return (
    <>
      <LandingNavbar />
      <Carousel />
      <ServiceCardSlides />
      <Clients />
      {/* <MessengerChat /> */}
      <OnTopButton  />
      <LandingFooter />
    </>
  )
}

export default LandingPage