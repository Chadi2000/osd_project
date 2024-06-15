import React, { useState } from 'react';
import './Input.css';

const Input = ({ label, type }) => {

  const [placeholder, setPlaceholder] = useState('');
  return (
    <div className='input_container'>
      <label className='textLabel'>{label}</label>
      <input type={type} id="input" name='input' placeholder={placeholder} />
    </div>
  );
}

export default Input;
