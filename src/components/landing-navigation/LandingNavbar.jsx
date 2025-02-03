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
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="links">
        <li className='text-white'> 
          <a onClick={() => onNavigate('home')}>Home</a>
        </li>
        <li className='text-white'>
          <a onClick={() => onNavigate('services')}>Services</a>
        </li>
        <li className='text-white'>
          <a onClick={() => onNavigate('clients')}>Clients</a>
        </li>
        <li className='text-white'>
          <a onClick={() => onNavigate('footer')}>Contact</a>
        </li>
        <li
          className="dropdown text-white"
          ref={dropdownRef}
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={dropdownOpen ? 'true' : 'false'}
        >
          <a onClick={(e) => e.preventDefault()} aria-label="Who We Are">
            Who We Are
          </a>
          {dropdownOpen && (
            <ul className="dropdown-menu" role="menu">
              <li>
                <a href="/company-profile">About Us</a>
              </li>
              <li>
                <a href="/announcement">Announcement</a>
              </li>
              <li>
                <a href="/workwithus">Work With Us</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          {checkedIfLoggedIn().status ? (
            <a href={`/${checkedIfLoggedIn().path}`} className="btn btn-outline-danger btn-sm login-btn">
              Dashboard
            </a>
          ) : (
            <a href="/login" className="btn btn-secondary btn-sm login-btn">
              Login
            </a>
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
