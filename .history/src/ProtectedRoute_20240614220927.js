import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component }) => {
    const { isLoggedIn } = useAuth();
  
    return isLoggedIn ? <Component /> : <Navigate to="/" />;
  };

export default ProtectedRoute;
