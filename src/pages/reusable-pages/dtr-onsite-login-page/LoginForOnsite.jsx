import React from 'react'
import './LoginForOnsite.css'

const LoginForOnsite = () => {
  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="login-box text-center p-4 rounded shadow">
        <h2 className="text-white mb-4">Welcome to the Kiosk</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="code" className="form-label text-white fs-5">
              Enter Access Code
            </label>
            <input
              type="text"
              className="form-control form-control-lg text-center"
              id="code"
              placeholder="••••••"
            />
          </div>
          <button type="submit" className="btn btn-light btn-lg w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForOnsite