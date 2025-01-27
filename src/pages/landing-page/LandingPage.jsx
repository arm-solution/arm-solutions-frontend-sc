import React, { useRef, useEffect } from 'react';
import './LandingPage.css';
import LandingFooter from './../../components/footer/LandingFooter';
import LandingNavbar from './../../components/landing-navigation/LandingNavbar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const LandingPage = () => {
  // Add a reference for the footer
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    clients: useRef(null),
    whyArms: useRef(null),
    footer: useRef(null),  // Reference for the footer section
  };

  const navigate = useNavigate();
  const location = useLocation(); // Access location to detect hash changes

  // Function to handle smooth scrolling to a section
  const handleScrollToSection = (section) => {
    navigate('/');  // Navigate back to the landing page before scrolling
    setTimeout(() => {
      const target = sectionRefs[section]?.current;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);  // Delay to ensure navigation happens before scrolling
  };

  // Effect to handle the URL hash on load or hash change
  useEffect(() => {
    const hash = location.hash.slice(1);  // Remove '#' from the hash
    if (sectionRefs[hash]) {
      setTimeout(() => {
        sectionRefs[hash]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  // Ensure scroll to section on initial page load or refresh
  useEffect(() => {
    const hash = window.location.hash.slice(1);  // Handle hash on initial load
    if (sectionRefs[hash]) {
      setTimeout(() => {
        sectionRefs[hash]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);  // Delay for smooth scrolling
    }
  }, []);  

  return (
    <>
      <LandingNavbar onNavigate={handleScrollToSection} />
      <main>
        <Outlet context={sectionRefs} />
      </main>
      <div ref={sectionRefs.footer}>
        <LandingFooter   />  
      </div>
    </>
  );
};

export default LandingPage;
