// customs/global/RequireAuth.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const authData = localStorage.getItem('authEmployee');

  if (!authData) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RequireAuth;
