import React from 'react';
import './WhyArms.css';
import fire1 from './../../assets/images/fire1.png';
import { useScreenWidth } from './../../customs/global/forMobile';

const WhyArms = () => {
  return (
    <>
      <section id='whyArms'>
        <div className="row mobileVisible">
            <img src={fire1} alt="" />
        </div>
        <div className="container">


          <div className="row why-con">
            <div className="col col-md-7">
     

                  <h2>Why Trusting <span>ARMS SOLUTIONS ENTERPRISES</span> is a Better Idea?</h2>
                  <ul>
                    <li style={{ textAlign: "justify" }}>
                      Our Company has a strong business partnership with reputable suppliers and manufacturers locally and internationally. We assure
                      clients that all our products are of the best quality at the most affordable prices.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      Our team of professionals can advise your home, business, or organization about the
                      various types of fire safety products and protection systems that best suit your requirements
                      and industry standards.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      Our Company takes pride in providing above satisfaction customer service and experience.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      All our personnel are professional, highly-trained, and licensed in their respective fields. Therefore, quality and safety are
                      always guaranteed.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      Our company is recognized for delivering prompt, practical, and technical solutions to our client's varying needs.
                    </li>
                  </ul>

            </div>
            <div className="col col-md-5">
              <div className="fire-con">
                <img src={fire1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyArms;
