import React, { useState, useEffect } from 'react';
import './WorkWithUs.css';
import { useSelector, useDispatch } from 'react-redux';
import LandingNavbar from '../../components/landing-navigation/LandingNavbar';
import LandingFooter from '../../components/footer/LandingFooter';
import headerImage from './../../assets/images/bg3.jpg';
import { getAllCareers } from '../../store/features/careerSlice';
import { dateFormat } from '../../customs/global/dateFormat';

const WorkWithUsPage = () => {
  const dispatch = useDispatch();

  const { data: allCareers, loading: careerLoading } = useSelector(state => state.careers);
  useEffect(() => {
    dispatch(getAllCareers());
  }, [dispatch]);

  const sortedCareers = [...allCareers].sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

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
          {sortedCareers.map((job, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-lg rounded-4 border-0">
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold text-primary">{job.title}</h5>
                  <span className="badge bg-secondary text-white mb-2" style={{ fontSize: '12px' }}>Posted: {dateFormat(job.date_created)}</span>
                  <span className="badge bg-info text-dark mb-2" style={{ fontSize: '10px' }}>Location: {job.location}</span>
                  <span className="badge bg-warning text-dark mb-3" style={{ fontSize: '10px' }}>Job Type: {job.job_type}</span>
                  <p className="text-muted flex-grow-1">{job.description}</p>
                  <a href="#" className="btn btn-primary w-100">Apply Now</a>
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