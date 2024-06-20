import React from 'react'
import './Carousel.css';
import image1 from './../../assets/images/image1.jpg'
import image2 from './../../assets/images/image2.jpg'
import image3 from './../../assets/images/image3.jpg'

const Carousel = () => {
  return (
    <section id='home'>
      <div className='carousel-container'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-start text-start">
                <h5 className='mt-5 fs-3 text-uppercase'>First slide label</h5>
                <h1 className='display-1 fw-bolder text-capitalize'>Sample text</h1>
                <button>Book a Tour</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={image2} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-start text-start">
                <h5 className='mt-5 fs-3 text-uppercase'>First slide label</h5>
                <h1 className='display-1 fw-bolder text-capitalize'>Sample text</h1>
                <button>Book a Tour</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={image3} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-start text-start">
                <h5 className='mt-5 fs-3 text-uppercase'>First slide label</h5>
                <h1 className='display-1 fw-bolder text-capitalize'>Sample text</h1>
                <button>Book a Tour</button>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Carousel
