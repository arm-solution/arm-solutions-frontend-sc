import React from 'react'
import './Services.css';
import cardImage from './../../assets/images/cardImage.png';

const ServiceCardSlides = () => {
 // Example card data
 const cards = [
    {
      title: 'Card 1',
      description: 'Description for card 1.',
      buttonLabel: 'Go somewhere',
      image: cardImage
    },
    {
      title: 'Card 2',
      description: 'Description for card 2.',
      buttonLabel: 'Go somewhere',
      image: cardImage
    },
    {
      title: 'Card 3',
      description: 'Description for card 3.',
      buttonLabel: 'Go somewhere',
      image: cardImage
    },
    {
      title: 'Card 4',
      description: 'Description for card 4.',
      buttonLabel: 'Go somewhere',
      image: cardImage
    },
    {
      title: 'Card 5',
      description: 'Description for card 5.',
      buttonLabel: 'Go somewhere',
      image: cardImage
    },
    {
      title: 'Card 6',
      description: 'Description for card 6.',
      buttonLabel: 'Go somewhere',
      image: cardImage
    },
    {
      title: 'Card 6',
      description: 'Description for card 6.',
      buttonLabel: 'Go somewhere',
      image: cardImage
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