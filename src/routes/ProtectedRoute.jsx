import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authData = localStorage.getItem('authEmployee');
  
  if (authData) {
    try {
      const parsedAuthData = JSON.parse(authData);
      
      // Check if the parsed data is an object and contains a non-empty array in `data`
      if (parsedAuthData && typeof parsedAuthData === 'object' && Array.isArray(parsedAuthData.data) && parsedAuthData.data.length > 0) {
        const role = parsedAuthData.data[0].user_type;

        if (role === 'admin') {
          return <Navigate to="/admin" />;
        } else if (role === 'employee') {
          return <Navigate to="/employees" />;
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
