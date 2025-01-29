import React from 'react';
import './WorkWithUs.css';
import LandingNavbar from '../../components/landing-navigation/LandingNavbar';
import LandingFooter from '../../components/footer/LandingFooter';
import headerImage from './../../assets/images/bg3.jpg';

const jobPositions = [
  { title: 'Laravel Developer', location: 'San Francisco, US', type: 'Full-Time' },
  { title: 'React Developer', location: 'New York, US', type: 'Part-Time' },
  { title: 'Node.js Developer', location: 'London, UK', type: 'Remote' },
];

const WorkWithUsPage = () => {
  return (
    <>
      <LandingNavbar />
      <div className="overlay-container" style={{ backgroundImage: `url(${headerImage})` }}>
          <div className="text-overlay">
          WORK WITH US
          </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Available Positions</h2>
        <p className="text-center text-muted mb-4">
          Explore the exciting career opportunities we have for you!
        </p>

        <div className="row">
          {jobPositions.map((job, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{job.title}</h5>
                  <p className="card-text text-muted mb-2">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {job.location}
                  </p>
                  <span
                    className={`badge badge-small text-white mb-3 bg-secondary`}
                  >
                    {job.type}
                  </span>


                  <a
                    href="#"
                    className="btn btn-outline-primary mt-auto align-self-start"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger btn-sm">
            Load More <i className="bi bi-arrow-down-circle ms-2"></i>
          </button>
        </div>
      </div>

      <LandingFooter />
    </>
  );
};

export default WorkWithUsPage;
