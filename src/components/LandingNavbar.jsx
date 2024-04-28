import React from 'react'
import './../customs/LandingPage.css';
import logo from './../assets/images/logo.png'

const LandingNavbar = () => {

  return (
    <nav>
        <input id="nav-toggle" type="checkbox" />
        <div className="logo"><img src={logo} alt="" className='logo-image' /></div>
        <ul className="links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#work">Work / Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#projects">Clients</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#projects" className='btn btn-secondary'>Login</a></li>
        </ul>
        <label for="nav-toggle" className="icon-burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </label>
    </nav>
  )
}

export default LandingNavbar