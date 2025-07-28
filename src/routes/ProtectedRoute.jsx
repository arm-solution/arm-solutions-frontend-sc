import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authData = localStorage.getItem('authEmployee');
  
  if (authData) {
    try {
      const parsedAuthData = JSON.parse(authData);
      
      // Check if the parsed data is an object and contains a non-empty array in `data`
      if (parsedAuthData && typeof parsedAuthData === 'object' && Array.isArray(parsedAuthData.data) && parsedAuthData.data.length > 0) {
        const role = parsedAuthData.data[0].department;

        if (role === 1) {
          return <Navigate to="/admin" />;
        } else if (role === 2) {
          return <Navigate to="/hr" />;
        } else if (role === 3) {
          return <Navigate to="/accounting" />;
        } else if (role === 4) {
          return <Navigate to="/finance" />;
        } else if (role === 5) {
          return <Navigate to="/warehouse" />;
        } else if (role === 6) {
          return <Navigate to="/engineering" />;
        } else if (role === 7) {
          return <Navigate to="/purchasing" />;
        } else if (role === 8) {
          return <Navigate to="/marketing" />;
        } else if (role === 9) {
          return <Navigate to="/sales" />;
        } else if (role === 10) {
          return <Navigate to="/production" />;
        }
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      // If there's an error parsing, treat it as if the user is not authenticated
      return <Navigate to="/login" />;
    }
  }

  // If not authenticated or data is invalid, allow access to children (e.g., login page)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
