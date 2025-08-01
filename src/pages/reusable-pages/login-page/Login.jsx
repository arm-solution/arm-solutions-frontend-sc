import React, { useState, useEffect, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginEmployee, clearLoginState } from '../../../store/features/authEmployee';
import './LoginPage.css'
import { checkAuthAndNavigate } from './../../../customs/global/manageLocalStorage';
// import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import Loading from '../../../components/loading-spinner/Loading';

const Login = () => {

  const { isSuccess: loginSuccess, message, loading: loginLoading } = useSelector((state) => state.auth);


  const [errmessage, setErrMessage] = useState({
    status: false,
    message: message
  })
  const [loginData, setLoginData] = useState({
      employee_id: '',
      user_password: ''
  })


const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
  if (loginSuccess) {
    checkAuthAndNavigate(navigate);
    // dispatch(clearLoginState());
  }
}, [loginSuccess, navigate]);
  

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value
    })

  }

  const handleLogin = async (e) => {
      e.preventDefault();
    
      if (loginData.employee_id === '' || loginData.user_password === '') {
        setErrMessage({
          status: true,
          message: 'All fields are required!',
        });
        return;
      }
    
      try {
        const { payload, error } = await dispatch(loginEmployee(loginData));
    
        if (error) {
          // Log any error details for mobile debugging
          console.error("Dispatch Error:", error);
          setErrMessage({
            status: true,
            message: error.message || 'An unexpected error occurred during login',
          });
          return;
        }
    
        if (payload?.message) {
          // Set the error message if API response includes an error message
          setErrMessage({
            status: true,
            message: payload.message,
          });
          return;
        }
    
      } catch (error) {
        // Log unexpected errors for better insight
        alert("Login Error:", error);
        setErrMessage({
          status: false,
          message: 'An unexpected error occurred',
        });
      }
  }
  

  return (
    <section className=" py-3 py-md-5 py-xl-8 login-section" >
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-12 col-md-6 col-xl-7">
            <div className="d-flex justify-content-center back-text">
              <div className="col-12 col-xl-9">

                {/* { loginLoading && ( <Loading /> )} */}

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
                      <h3>Sign in</h3>
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
                        <input type="password" className="form-control" name="user_password" id="user_password" onChange={handleChange}  required />
                        <label htmlFor="user_password" className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                    {/* This is for keep me logged in checkbox */}
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-danger btn-lg" onClick={handleLogin}>Log in now</button>
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
                      {/* <a href="#!">Forgot password</a> */}
                      <Link to="/forgot-password">Forgot Password?</Link>
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

export default Login