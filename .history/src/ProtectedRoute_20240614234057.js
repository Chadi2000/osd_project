// ProtectedRoute.js

import React from 'react';
import { useNavigate, } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Use the useNavigate hook
  const navigate = useNavigate();

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    navigate('/');
    return null; // Render nothing while redirecting
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;
