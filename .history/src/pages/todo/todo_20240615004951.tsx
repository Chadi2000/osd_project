import React from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const { logout, isAuthenticated } = useAuth(); // Ensure to correctly destructure the values returned by useAuth
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('isAuthenticated: ' + isAuthenticated);
    logout(); // Call the logout function from useAuth
    navigate('/login'); // Navigate to the login page after logout
    console.log('isAuthenticated: ' + isAuthenticated); // This will log the previous value of isAuthenticated, as state updates are asynchronous
  };

  return (
    <div>
      <h1>Todo Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Todo;
