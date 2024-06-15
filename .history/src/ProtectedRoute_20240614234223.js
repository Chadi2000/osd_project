// ProtectedRoute.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Use the useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Render the protected content if authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
