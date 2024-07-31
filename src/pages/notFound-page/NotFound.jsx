import React from 'react'
import { Link } from 'react-router-dom';
import Loading from '../../components/loading-spinner/Loading';

const NotFound = () => {
  return (
    <div className="container">
        <h1 className="display-1">404</h1>
        <p className="lead">Oops! The page you are looking for cannot be found.</p>
        <Link to='/' className="btn btn-primary btn-home">Go to Homepage</Link>
    </div>
  )
}

export default NotFound