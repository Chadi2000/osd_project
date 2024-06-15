import React from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo1,Search,Circle,Bitmap,RemoveQuote } from '../../assets';

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
        <img src={Search} alt="search" className='img_search' />
        <img src={Circle} alt="circle" className='img_circle' />
        <img src={Bitmap} alt="bitMap" className='img_bitmap' />
      </div>

      <div className='app_todo-todo-list-header'>
        <h2 className='quote'>"Anything that can go wrong, will go wrong!"</h2>
        <img src={RemoveQuote} alt="remove" className='remove_quote' />
      </div>
      
      <div className='background'>

      </div>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Todo;
