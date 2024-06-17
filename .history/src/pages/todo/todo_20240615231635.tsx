import React, { useState } from 'react';
import './Todo.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo1,Search,Circle,Bitmap,RemoveQuote, ShowQuote, IconIonic } from '../../assets';
import axios from 'axios';

const Todo = () => {
  const email = localStorage.getItem('email');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [estimate,setEstimate] = useState('');
  const[importance, setImportance] = useState('');

  const handleTitleChange = (value) =>{
    setTitle(value)
  }
  const handleCategoryChange = (value) =>{
    setCategory(value)
  }
  const handleDueDateChange = (value) =>{
    setDueDate(value)
  }
  const handleEstimateChange = (value) =>{
    setEstimate(value)
  }
  const handleImportanceChange = (value) =>{
    setImportance(value)
  }

  const handleSave = () => {
    const data = {
      Title: title,
      Category: category,
      DueDate: dueDate,
      Estimate: estimate,
      Importance: importance,
      Email:email
    };
    const url = 'https://localhost:44387/api/Test/TodoInsert';
    axios.post(url,data).then((result) =>{
        alert(result.data);
    }).catch((error)=>{
        alert(error);
    })


}

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);
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
        <img src={Bitmap} alt="bitMap" className='img_bitmap' onClick={() => setOpenDropDown(!openDropDown)} />
      </div>

      <div className='app__todo-user_dropdown' style={{display: openDropDown? 'flex' :'none'}}>
          <div className='najo'>
            <img src={Bitmap} alt="bitmap" className='dropdown_bitmap' />

            <div>
              <h4 className='dropdown_email'> {email}</h4>
              <div className='logout_container' onClick={handleLogout} >
                  <p className='logout_container-text'>Log Out</p>
                  <img src={IconIonic} alt="ionic" className='logout_container-img' />
              </div>
            </div>
          </div>
          
      </div>

      <div className='app_todo-todo-list-header' style={{display: isQuoteVisible ? 'flex' : 'none'}}>
        <h2 className='quote'>"Anything that can go wrong, will go wrong!"</h2>
        <img src={RemoveQuote} alt="remove" className='remove_quote' onClick={toggleQuoteVisibility} />
      </div>
      
      <div className='background'>
        <div>
        <div>Registration</div>
         <label>Title</label>
         <input type='text' id='txtName' placeholder='Enter title' onChange={(e) => handleTitleChange(e.target.value)} /><br></br>
         <label>Phone Number</label>
         <input type='text' id='txtPhoneNo' placeholder='Enter category' onChange={(e) => handleCategoryChange(e.target.value)} /><br></br>
         <label>Address</label>
         <input type='text' id='txtAddress' placeholder='Enter date' onChange={(e) => handleDueDateChange(e.target.value)} /><br></br>
         <label>Email</label>
         <input type='text' id='txtAddress' placeholder='Enter estimate' onChange={(e) => handleEstimateChange(e.target.value)} /><br></br>
         <label>Password</label>
         <input type='text' id='txtAddress' placeholder='Enter importance' onChange={(e) => handleImportanceChange(e.target.value)} /><br></br>
         <button onClick={() => handleSave()}>Save</button>
        </div>
        <div style={{display: isQuoteVisible ? 'none' : 'flex'}} >
          <img src={ShowQuote} alt="show quote" className='show_quote'  onClick={toggleQuoteVisibility} />
        </div>
        

      </div>

    </div>
  );
};


export default Todo;
