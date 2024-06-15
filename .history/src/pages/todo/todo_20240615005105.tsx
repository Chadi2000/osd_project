import React from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('isAuthenticated: ' + isAuthenticated);
    logout();
    navigate('/login');
    console.log('isAuthenticated: ' + isAuthenticated);
  };

  return (
    <div>
      <h1>Todo Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Todo;
