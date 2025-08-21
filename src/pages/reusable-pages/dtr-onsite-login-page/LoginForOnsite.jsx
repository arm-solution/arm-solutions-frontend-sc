import React, { useState, useEffect } from 'react'
import './LoginForOnsite.css'
import { loginQiosk } from '../../../store/features/authEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const LoginForOnsite = () => {

  const dispatch = useDispatch();

  const { kioskData, loading, isSuccess } = useSelector(state => state.auth);

  const [pinCode, setPinCode] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {

    if(pinCode !== '') {
      await dispatch(loginQiosk(pinCode));
    } else {
      alert("Enter PiN code");
    }

  }

  useEffect(() => {
    if(isSuccess) {
      navigate("/dtr-onsite-access");
    }
  }, [kioskData, isSuccess])
  

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="login-box text-center p-4 rounded shadow">
        <h2 className="text-white mb-4">Welcome Back</h2>
          <div className="mb-3">
            <label htmlFor="code" className="form-label text-white fs-5">
              Enter Access Code
            </label>
            <input
              type="text"
              className="form-control form-control-lg text-center"
              id="code"
              placeholder="••••••"
              onChange={(e) => {setPinCode(e.target.value)}}
            />
          </div>
          <button className="btn btn-light btn-lg w-100" onClick={handleLogin} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
      </div>
    </div>
  );
}

export default LoginForOnsite