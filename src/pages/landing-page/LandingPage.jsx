import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './LandingPage.css';
import LandingNavbar from './../../components/landing-navigation/LandingNavbar';
import LandingFooter from './../../components/footer/LandingFooter';
import Carousel from './../../components/carousel-image/Carousel';
import Clients from '../../components/clients/Clients';
import ServiceCardSlides from '../../components/services/ServiceCardSlides';
import OnTopButton from '../../components/ontop-button/OnTopButton';
import WhyArms from '../../components/why-arms/WhyArms';
import Profile from '../company-profile-page/Profile';
import CompanyHistory from '../../components/company-history/CompanyHistory';
import MessengerChat from '../../components/MessengerChat';
 
const AboutUsPage = () => (
<>
<Profile />
<CompanyHistory />
</>
);
 
const LandingPageContent = () => (
<>
<Carousel />
<ServiceCardSlides />
<Clients />
<WhyArms />
<MessengerChat />
<OnTopButton />
</>
);
 
const LandingPageLayout = () => (
<>
    {/* Persistent Navbar */}
<LandingNavbar />
    {/* Routed content */}
<Outlet />
 
    {/* Persistent Footer */}
<LandingFooter />
</>
);
 
const LandingPage = () => {
  return (
<Routes>
<Route path="/" element={<LandingPageLayout />}>
        {/* Default Landing Page Content */}
<Route index element={<LandingPageContent />} />
        {/* About Us Page */}
<Route path="announcement" element={<AboutUsPage />} />
</Route>
</Routes>
  );
};
 
export default LandingPage;