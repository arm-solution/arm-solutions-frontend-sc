import React, {useState,  useEffect } from 'react'
import backVid from './../../assets/images/backVid.mp4'
import './Client.css';
import {
  jollibee,
  sanmiguel,
  cabrini,
  citymart,
  lasalle,
  devinHospital,
  fiestaHome,
  greenwich,
  hapchan,
  inasal,
  kennyrogers,
  kfc,
  landbank,
  limaland,
  maquiling,
  maxs,
  metrogaisano,
  mitsuba,
  mitsubishi,
  malarayat,
  mrdiy,
  nippon,
  pepper,
  sanitaryCare,
  shopright,
  southSupermarket,
  stJude,
  suysing,
  tayabasHospital,
  trc,
  twinlakes,
  yellowCab
} from './../../customs/global/clientLogo'



const Clients = () => {
  const logos = [
    jollibee,
    sanmiguel,
    cabrini,
    citymart,
    lasalle,
    devinHospital,
    fiestaHome,
    greenwich,
    hapchan,
    inasal,
    kennyrogers,
    kfc,
    landbank,
    limaland,
    maquiling,
    maxs,
    metrogaisano,
    mitsuba,
    mitsubishi,
    malarayat,
    mrdiy,
    nippon,
    pepper,
    sanitaryCare,
    shopright,
    southSupermarket,
    stJude,
    suysing,
    tayabasHospital,
    trc,
    twinlakes,
    yellowCab,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [logos.length]);

  return (
    <section id="clients">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={backVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content-overlay">
          <h1 className='mb-5'>Our major clients for fire protection and safety</h1>
          <div className="container mt-0">
            <div
              className="img-slider"
              style={{ transform: `translateX(-${currentIndex * 14.28}%)` }}
            >
              {logos.map((logo, index) => (
                <div key={index} className="img-container">
                  <img src={logo} alt={`Client logo ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
