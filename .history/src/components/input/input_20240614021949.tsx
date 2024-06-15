import React from 'react';
import './Input.css';

const Input = ({ label, placeholder, type }) => {
  return (
    <div className='app_input'>
      <label className='textLabel'>{label}</label>
      <input type={type} id="input" name='input' placeholder={placeholder} />
    </div>
  );
}

export default Input;
