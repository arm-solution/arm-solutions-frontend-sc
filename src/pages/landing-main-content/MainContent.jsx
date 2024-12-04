import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import ServiceCardSlides from '../../components/services/ServiceCardSlides';
import OnTopButton from '../../components/ontop-button/OnTopButton';
import WhyArms from '../../components/why-arms/WhyArms';
import MessengerChat from '../../components/MessengerChat';
import Carousel from '../../components/carousel-image/Carousel';
import Clients from '../../components/clients/Clients';

const MainContent = () => {
  const sectionRefs = useOutletContext();
  return (
    <>
      <div ref={sectionRefs.home} id="home">
        <Carousel />
      </div>
      <div ref={sectionRefs.services} id="services">
        <ServiceCardSlides />
      </div>
      <div ref={sectionRefs.clients} id="clients">
        <Clients />
      </div>
      <div ref={sectionRefs.whyArms} id="whyArms">
        <WhyArms />
      </div>
      <MessengerChat />
      <OnTopButton />
    </>
  );
};

export default MainContent;
