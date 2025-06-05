import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearMessage, forgotPasswordRequest } from '../../../store/features/userSlice';
import './ForgotPasswordPage.css'
import { checkAuthAndNavigate } from './../../../customs/global/manageLocalStorage';
import { successDialog } from '../../../customs/global/alertDialog';
// import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import FloatNotification from '../../../components/float-notification/FloatNotification';

const ForgotPassword = () => {

    const { isSuccess, message, loading  } = useSelector((state) => state.users)

    const [errmessage, setErrMessage] = useState({
        status: isSuccess,
        message: message
    })
    const [userCred, setUserCred] = useState({
        email: '',
        employee_id: ''
    })


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
        checkAuthAndNavigate(navigate)
        }
    }, [isSuccess, navigate]);


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setUserCred({
        ...userCred,
        [name]: value
        })

    }

    const requestPassword = async (e) => {
      e.preventDefault();

      
      if(userCred.email === '' || userCred.employee_id === '') {
        setErrMessage({
          status: true,
          message: "All Fields Are Required"
        })
        return;
      }

     await dispatch(forgotPasswordRequest(userCred));

     if(isSuccess) {
        setUserCred({
          email: '',
          employee_id: ''
        })
     }

    }


  return (
    <section className=" py-3 py-md-5 py-xl-8 login-section" >
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-12 col-md-6 col-xl-7">
            <div className="d-flex justify-content-center back-text">
              <div className="col-12 col-xl-9">

                <h2 className="h2 mb-4 mt-0">Arm Solution Enterprises Portal</h2>
                {/* <img className="img-fluid rounded mb-4" loading="lazy" src="./assets/img/bsb-logo-light.svg" width="245" height="80" alt="BootstrapBrain Logo"/> */}
                
                <hr className="border-primary-subtle mb-4"/>
                
                <div className="mission-visson">
                  <h2 className="h4 mb-4">Mission</h2>
                  <p className="lead mb-5">
                  Our core mission is straightforward - to answer the current and future needs
                  of different industries through our provision of excellent products and services,
                  which are guaranteed safe, cost-effective, and highly efficient.
                  </p>

                  <p className="lead mb-5">
                  We aim to offer our clients with the most technical solutions  in meeting their
                  specific requirements at the most affordable cost. We are considerate of our clients
                  varying needs and financial condition in addressing their need with satisfaction guaranteed.
                  </p>

                  <h2 className="h4 mb-4">Vision</h2>
                  <p className="lead mb-5">
                  To be the country's most comprehensive and professional solution provider
                  and to promote customer satisfaction by providing them with innovative products, professional
                  consultation, and service maintenance
                  </p>

                </div>
                
                <div className="text-endx">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-grip-horizontal" viewBox="0 0 16 16">
                    <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-5">
            <div className="card border-0 rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <h3>Forgot Password</h3>
                    </div>
                  </div>
                </div>
        
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="employee_id" id="employee_id" onChange={handleChange}  required />
                        <label htmlFor="employee_id" className="form-label">Employee No.</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="email" id="email" onChange={handleChange}  required />
                        <label htmlFor="email" className="form-label">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                    {/* This is for keep me logged in checkbox */}
                    </div>
                    <div className="col-12">
                      <div className="d-grid">

                        <button 
                          className="btn btn-danger btn-lg" 
                          onClick={(e) => requestPassword(e)} 
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            'Reset Password'
                          )}
                        </button>

                        <FloatNotification message={message} onClose={() =>dispatch(clearMessage()) }/>

                      </div>
                    </div>
                    <div className="col-12">
                      {errmessage.status && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          <strong>{ errmessage.message }</strong>
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setErrMessage(e => e.status = false)}></button>
                        </div>
                      )}
                    </div>
                  </div>
    
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                      <Link to="/login">Login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword