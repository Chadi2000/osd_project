import React from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo1, } from '../../assets';

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
        <img src={Logo1} alt="logo" className='img_logo' />
      </div>

      <div>

      </div>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Todo;
