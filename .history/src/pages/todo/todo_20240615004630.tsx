import React from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [ logout, isAuthenticated ] = useAuth();
  const navigate = useNavigate();

  const Logout = () =>{
    console.log('isAuthenticated: ' + isAuthenticated);
    logout();
    console.log('isAuthenticated: ' + isAuthenticated);
  }
  return (
    <div>
      <h1>Todo Page</h1>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  )
}

export default Todo
