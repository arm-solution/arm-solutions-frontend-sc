import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import './LandingNav.css';
import { checkedIfLoggedIn } from '../../customs/global/manageLocalStorage';

const LandingNavbar = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
    <input id="nav-toggle" type="checkbox" />
    <div className="logo"><img src={logo} alt="Logo" className='logo-image' /></div>
    <ul className="links">
        <li><a href="#home" onClick={handleBackToLandingPage}>Home</a></li>
        <li><a href="#services" onClick={handleBackToLandingPage}>Services</a></li>
        {/* <li><a href="#projects" onClick={handleBackToLandingPage}>Projects</a></li> */}
        <li><a href="#clients" onClick={handleBackToLandingPage}>Clients</a></li>
        <li><a href="#footer" onClick={handleBackToLandingPage}>Contact</a></li>
        {/* <li><a href="#about-us" onClick={handleAboutUsPage}>About Us</a></li> */}
        <li 
            className="dropdown"
            ref={dropdownRef}
            onClick={toggleDropdown}
        >
            <a href="#who-we-are">Who We Are</a>
            {dropdownOpen && (
                <ul className="dropdown-menu">
                    <li><a href="#about-us" onClick={handleAboutUsPage}>About Us</a></li>
                    <li><Link to="/announcement">Announcement</Link></li>
                    <li><a href="#careers" onClick={handleBackToLandingPage}>Careers</a></li>
                    <li><a href="#workwithus" onClick={handleBackToLandingPage}>Work With Us</a></li>
                </ul>
            )}
        </li>
        <li>
      
          {checkedIfLoggedIn().status ?  (
            
            <Link to={`/${checkedIfLoggedIn().path}`} className='btn btn-outline-danger btn-sm login-btn'>Dashboard</Link>
          ) : (
            
            // <Link to='/login' className='btn btn-secondary btn-sm login-btn'> Login</Link>
            <Link to='/login' className='btn btn-secondary btn-sm login-btn'> Login</Link>
          )}
        </li>
      </ul>
      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </label>
    </nav>
  );
};

export default LandingNavbar;
