import React, { useState } from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo1,Search,Circle,Bitmap,RemoveQuote, ShowQuote } from '../../assets';

const Todo = () => {
  const email = localStorage.getItem('email');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);

  const toggleQuoteVisibility = () => {
    setIsQuoteVisible(!isQuoteVisible);
  };

  return (
    <div className='app__todo'>
      <div className='app__todo-header'>
        <img src={Logo1} alt="logo" className='img_logo' />
        <img src={Search} alt="search" className='img_search' />
        <img src={Circle} alt="circle" className='img_circle' />
        <img src={Bitmap} alt="bitMap" className='img_bitmap' />
      </div>

      <div className='app__todo-user_dropdown'>
        <h1> welcome : {email}</h1>
      </div>

      <div className='app_todo-todo-list-header' style={{display: isQuoteVisible ? 'flex' : 'none'}}>
        <h2 className='quote'>"Anything that can go wrong, will go wrong!"</h2>
        <img src={RemoveQuote} alt="remove" className='remove_quote' onClick={toggleQuoteVisibility} />
      </div>
      
      <div className='background'>
        <div>

        </div>
        <div style={{display: isQuoteVisible ? 'none' : 'flex'}} >
          <img src={ShowQuote} alt="show quote" className='show_quote'  onClick={toggleQuoteVisibility} />
        </div>
        

      </div>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};


export default Todo;
