import React from 'react'
import LandingNavbar from '../../components/landing-navigation/LandingNavbar'
import LandingFooter from '../../components/footer/LandingFooter'
import headerImage from './../../assets/images/fire-ext.jpg';

const AnnouncementPage = () => {
  return (
    <>
        <LandingNavbar />
            <div className="overlay-container" style={{ backgroundImage: `url(${headerImage})` }}>
                <div className="text-overlay">
                COMPANY ANNOUNCEMENT
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <div className="post">
                            <div className="post-img-content">
                                <img src="http://placehold.it/460x250/e67e22/ffffff&text=HTML5" className="img-responsive" />
                                <span className="post-title"><b>Make a Image Blur Effects With</b><br />
                                    <b>CSS3 Blur</b></span>
                            </div>
                            <div className="content">
                                <div className="author">
                                    By <b>Bhaumik</b> |
                                    <time datetime="2014-01-20">January 20th, 2014</time>
                                </div>
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                                <div>
                                    <a href="http://www.jquery2dotnet.com/2014/01/jquery-highlight-table-row-and-column.html" className="btn btn-warning btn-sm">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="post">
                            <div className="post-img-content">
                                <img src="http://placehold.it/460x250/2980b9/ffffff&text=CSS3" className="img-responsive" />
                                <span className="post-title"><b>Make a Image Blur Effects With</b><br />
                                    <b>CSS3 Blur</b></span>
                            </div>
                            <div className="content">
                                <div className="author">
                                    By <b>Bhaumik</b> |
                                    <time datetime="2014-01-20">January 20th, 2014</time>
                                </div>
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                                <div>
                                    <a href="http://www.jquery2dotnet.com/2013/11/share-social-media-round-buttons.html" className="btn btn-primary btn-sm">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="post">
                            <div className="post-img-content">
                                <img src="http://placehold.it/460x250/47A447/ffffff&text=jQuery" className="img-responsive" />
                                <span className="post-title"><b>Make a Image Blur Effects With</b><br />
                                    <b>CSS3 Blur</b></span>
                            </div>
                            <div className="content">
                                <div className="author">
                                    By <b>Bhaumik</b> |
                                    <time datetime="2014-01-20">January 20th, 2014</time>
                                </div>
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                                <div>
                                    <a href="http://www.jquery2dotnet.com/2013/07/cool-social-sharing-button-using-css3.html" className="btn btn-success btn-sm">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            {/* <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <center>A</center>
                    </div>
                    <div className="col-md-4">
                        <center>B</center>
                    </div>
                    <div className="col-md-4">
                        <center>C</center>
                    </div>
                </div>
            </div> */}
        <LandingFooter />
    </>
  )
}

export default AnnouncementPage