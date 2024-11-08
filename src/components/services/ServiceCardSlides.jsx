import React from 'react'
import './Services.css';
import cardImage from './../../assets/images/cardImage.png';
import fireex from './../../assets/images/fireex.jpg';
import waterbased from './../../assets/images/waterbased.jpg';
import fdas from './../../assets/images/fdas.jpg';
import kitchenhood from './../../assets/images/kitchenhood.jpg';
import ppe from './../../assets/images/ppe.jpg';
import inertgas from './../../assets/images/inertgas.jpg';
import pm from './../../assets/images/pm.jpg';
import installation from './../../assets/images/installation.jpg';
import drill from './../../assets/images/drill.jpg';

const ServiceCardSlides = () => {
 // Example card data
 const cards = [
    {
      title: 'Fire Extinguisher',
      // description: 'Dry Chemical, AFFF Foam Type, Carbon Dioxide, HFC-236fa, Wet Chemical',
      description: 'We supply top-quality fire extinguishers, including Dry Chemical, AFFF Foam, CO2, HFC-236fa, and Wet Chemical types, for all fire classes',
      buttonLabel: 'See More',
      // image: cardImage
      image: fireex
    },
    {
      title: 'Water Based Fire Protection System and Accessories',
      description: 'Comprehensive water-based fire protection, including sprinklers and hydrants. Engineered to swiftly suppress fire risks.',
      buttonLabel: 'See More',
      image: waterbased
    },
    {
      title: 'Fire Detection and Alarm',
      description: 'Early fire detection with advanced alarm systems to keep your property and people safe. Swift alerts when it matters most',
      buttonLabel: 'See More',
      image: fdas
    },
    {
      title: 'Kitchenhood Fire Suppression',
      description: 'Specialized suppression systems for kitchen hoods. Designed to contain and extinguish grease fires instantly.',
      buttonLabel: 'See More',
      image: kitchenhood
    },
    {
      title: 'PPE and Construction Supply',
      description: 'High-quality personal protective equipment and construction supplies. Ensuring safety from head to toe for all job sites.',
      buttonLabel: 'See More',
      image: ppe
    },
    {
      title: 'Inert Gas & FM 200',
      description: 'Clean agent fire suppression systems using inert gas and FM 200, ideal for protecting sensitive equipment and spaces.',
      buttonLabel: 'See More',
      image: inertgas
    },
    {
      title: 'Preventive Maintenance',
      description: 'Routine inspections and maintenance services to keep your fire safety systems fully operational and compliant.',
      buttonLabel: 'See More',
      image: pm
    },
    {
      title: 'Supply and Installation',
      description: 'Full supply and installation of fire protection systems, ensuring optimal safety and functionality.',
      buttonLabel: 'See More',
      image: installation
    },
    {
      title: 'Fire Drill Assistance',
      description: 'We provide fire drill support to prepare your team for emergencies. Ensure a quick and safe evacuation every time.',
      buttonLabel: 'See More',
      image: drill
    }
    // Add more cards as needed
  ];

  // Function to chunk the cards array into groups
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  // Chunk the cards into groups of 3 for large screens and 1 for smaller screens
  const chunkedCardsLarge = chunkArray(cards, 3);
  const chunkedCardsSmall = chunkArray(cards, 1);

  return (
    <section id='services'>

    <div className="container">

      {/* Carousel for larger screens */}
      <div id="carouselExampleControlsLarge" className="carousel slide d-none d-md-block car-services" data-bs-ride="carousel">
      <h2 className='mb-4'><b>Our Services</b></h2>
        <div className="carousel-inner">
          {chunkedCardsLarge.map((chunk, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row">
                {chunk.map((card, idx) => (
                  <div key={idx} className="col-md-4">
                    <div className="card">
                      <img src={card.image} className="card-img-top" alt={`Card ${index * 3 + idx + 1}`} />
                      <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.description}</p>
                        <a href="#" className="btn btn-secondary">{card.buttonLabel}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsLarge" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsLarge" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Carousel for smaller screens */}
      <div id="carouselExampleControlsSmall" className="carousel slide d-md-none car-services" data-bs-ride="carousel">
        <div className="carousel-inner">
          {chunkedCardsSmall.map((chunk, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              {chunk.map((card, idx) => (
                <div key={idx} className="col-12">
                  <div className="card">
                    <img src={card.image} className="card-img-top" alt={`Card ${index * 1 + idx + 1}`} />
                    <div className="card-body">
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text">{card.description}</p>
                      <a href="#" className="btn btn-primary">{card.buttonLabel}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsSmall" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsSmall" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </section>
  );

}

export default ServiceCardSlides