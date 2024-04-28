import React from 'react'
import cardImage from './../assets/images/cardImage.png';

const ServiceCardSlides = () => {
  return (
    <>
    <div className="container">
    
    {/* carousel for bigger screen */}
    <div id="carouselExampleControls" className="carousel carousel-dark slide d-none d-sm-block" data-bs-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active">
            <div className="cards-wrapper">

                <div className="card" >
                
                    <img src={cardImage} className="card-img-top" alt='card image' />
                
                <div className="card-body">
                    <h5 className="card-title">Card title1</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

                <div className="card">
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title2</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>
                
                <div className="card">
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title3</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

            </div>
        </div>
        <div className="carousel-item">
            <div className="cards-wrapper">

                <div className="card" >
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title4</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

                <div className="card">
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title5</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>
                
                <div className="card">
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title6</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

            </div>
        </div>

    </div>
    <button className="carousel-control-prev prev-custom" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next next-custom" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
    </div>

    {/* carousel for smaller screen */}


    <div id="carouselForSmall" className="carousel carousel-dark slide mt-5 d-sm-none" data-bs-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active">
            
                <div className="card" >
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title1</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

        </div>
        <div className="carousel-item">
            
                <div className="card" >
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Lance</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

              
        </div>
        <div className="carousel-item">
            
                <div className="card" >
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Lance</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

              
        </div>
        <div className="carousel-item">
            
                <div className="card" >
                <div className="img-wrapper">
                    <img src={cardImage} className="card-img-top" alt='card image' />
                </div>
                <div className="card-body">
                    <h5 className="card-title">Lance</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>

              
        </div>

    </div>
    <button className="carousel-control-prev prev-custom" type="button" data-bs-target="#carouselForSmall" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next next-custom" type="button" data-bs-target="#carouselForSmall" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
    </div>

    </div>
    </>
  )
}

export default ServiceCardSlides