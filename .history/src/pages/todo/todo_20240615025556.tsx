import React from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='app__todo'>
      <div className='app__todo-header'>

      </div>

      <div>

      </div>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Todo;
