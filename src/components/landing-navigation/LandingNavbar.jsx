import React, { useState, useEffect, useRef } from 'react'
import logo from './../../assets/images/logo.png'
import './LandingNav.css'
import { Link } from 'react-router-dom';

const LandingNavbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 50 ) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li 
            className="dropdown"
            // onMouseEnter={() => setDropdownOpen(true)}
            // onMouseLeave={() => setDropdownOpen(false)}
            ref={dropdownRef}
            onClick={toggleDropdown}
        >
            <a href="#services">Work / Services</a>
            {dropdownOpen && (
                <ul className="dropdown-menu">
                    <li><a href="#design">Design</a></li>
                    <li><a href="#development">Development</a></li>
                    <li><a href="#marketing">Marketing</a></li>
                </ul>
            )}
        </li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#clients">Clients</a></li>
        <li><a href="#footer">Contact Us</a></li>
        <li>
            <Link to='/login' className='btn btn-success btn-sm login-btn'> Login</Link>
        </li>
    </ul>
    <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
    </label>
</nav>
  )
}

export default LandingNavbar