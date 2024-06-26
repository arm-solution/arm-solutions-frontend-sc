// customs/global/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authData = localStorage.getItem('authEmployee');

  if (authData) {
    const { data } = JSON.parse(authData);
    const role = data.length > 0 ? data[0].role : null;

    if (role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (role === 'employee') {
      return <Navigate to="/employees" />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
