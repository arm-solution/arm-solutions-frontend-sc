import React from 'react'
import './LandingPage.css';
import Carousel from './../../components/Carousel'
import Clients from './../../components/Clients';
import LandingFooter from './../../components/LandingFooter';
import LandingNavbar from './../../components/LandingNavbar';
import ServiceCardSlides from './../../components/ServiceCardSlides';
import MessengerChat from '../../components/MessengerChat';

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <Carousel />
      <ServiceCardSlides />
      <Clients />
      <MessengerChat />
      <LandingFooter />
    </>
  )
}

export default LandingPage