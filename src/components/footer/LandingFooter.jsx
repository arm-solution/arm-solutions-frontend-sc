import React from 'react';
import './Footer.css';
import { bps, pcab, pifpo, sopi, pcab2 } from './../../customs/global/certifications';

const LandingFooter = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-container mb-5">
        <div className="row row-container">
          <div className="col-12 col-sm-6 text-center text-sm-start mb-4 mb-sm-0">
            <div className="form-group">
              <label htmlFor="email" className="text-light m-3">Email</label>
              <input type="text" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="text-light m-3">Message</label>
              <textarea className="form-control" id="message" rows="8"></textarea>
            </div>
          </div>


          <div className="col-12 col-sm-6 text-center text-sm-center">
            <div className="contact mt-4">
              <h6 className="footer-heading text-uppercase text-white fw-bold">Contact Us</h6>
              <address className="mt-4 m-0 text-white mb-1">
                <i className="lni lni-home"></i> JCMA Building, Brgy Bilucao (San Isidro Western) Malvar Batangas
              </address>
              <a href="tel:+09281788958" className="text-white mb-1 text-decoration-none d-block fw-semibold">
                <i className="lni lni-mobile"></i> 0928-178-8958
              </a>
              <a href="mailto:armsolution@yahoo.com" className="text-white mb-1 text-decoration-none d-block fw-semibold">
                <i className="lni lni-envelope"></i> armsolution@yahoo.com
              </a>
              <a href="https://www.facebook.com/armsolutionenterprises" className="text-white text-decoration-none fw-semibold">
                <i className="lni lni-facebook-original"></i> ARM Solution Enterprises
              </a>
            </div>

            <div className="mt-5">
              <p>Certifications</p>

              <div className="certifications">

                <div className="certification-container">
                   <img src={pifpo} alt="" srcset="" />
                </div>
                <div className="certification-container">
                  <img src={bps} alt="" srcset="" />
                </div>
                <div className="certification-container">
                  <img src={sopi} alt="" srcset="" />
                </div>
                <div className="certification-container">
                  <img src={pcab2} alt="" srcset="" />
                </div>

              </div>

            </div>




          </div>
        </div>
      </div>
      <div className="bottom-style">
        <p className="mb-0">Copyright © 2024 Arm Solution, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default LandingFooter;
