import React from 'react'
import './CompanyHistory.css'
import RoundLogo from './../../assets/images/arm circle logo.png';

const CompanyHistory = () => {
  return (
    <>
        <div className="title-container">
            <h1 style={{ fontWeight: 'bolder'}}>Company History</h1>
        </div>

        <div className="history-text-container">
            <div className="col col-md-8">
                <p>
                Our company was founded on February 2012 by Mr. John Carlo Macalintal Arago who worked
                for three years in a fire protection company. With his exprrience in and exposure to the
                industry, he observed a mounting demand for fire safety and protection throughout the country.
                Urged by his passion for commercial enterprise and desire to provide employement to highly
                skilled young people, he setup a small and typical business that provides quality fire safety 
                supplies and  competent
                </p>
                <p>
                In just three years of its existence, ARM Solution Enterprises is able to establish
                itself as one of the top choices in its field, with its strings of partnership with
                reputable supplier and manufacturers that meet the industry standards.
                </p>
                <p>
                Now, ARM SOLUTION ENTERPRISES is headed by Ms. Justina Macalintal Arago, mothe of the
                late founder of the company. She continued the legacy and business operations for intention
                of delivering a complete range of quality services to residential homes, business offices and
                industrial companies with highly proficient and experienced professionals. Aside from having
                competent engineers and reliable personnel, our company has also partnered with reputable 
                manufacturer and other enterprises, to ensure that our clients wil have nothing but
                quality yet affordable products.
                </p>
                <p>
                Today, we are not only considered as one of the best companies for fire safety and protection
                needs, but we are also a top choice when it comes to supplies and services in the field of
                construction, industrial, and mechanical as well as in the painting industry.
                </p>
                <br />

            </div>
            <div className="col col-md-4">
                <img src={RoundLogo} alt="" />
            </div>
        </div>

        
        <div className="owner-qoute">
            <h1 style={{ fontWeight: 'bolder'}}>"My Capital and my Assets are my People"</h1>
            <div className="founder-details">
                <p><i>-- Mr. JOHN CARLO M. ARAGO, Founder of ARM SOLUTION ENTERPRISES</i></p>
            </div>
        </div>

    </>
  )
}

export default CompanyHistory