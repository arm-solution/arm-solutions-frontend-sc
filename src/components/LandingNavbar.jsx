import React, { useState, useEffect } from 'react'
import logo from './../assets/images/logo.png'
import { Link } from 'react-router-dom';
import {useScreenWidth} from './../customs/global/forMobile'

const LandingNavbar = () => {

  const mobileSize = useScreenWidth();

  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={scrolled && 'scrolled'}>

        <input id="nav-toggle" type="checkbox" />
        <div className="logo"><img src={logo} alt="" className='logo-image' /></div>
        <ul className="links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#work">Work / Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#projects">Clients</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
             <Link to='/login'  className='btn btn-secondary'> Login</Link>
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