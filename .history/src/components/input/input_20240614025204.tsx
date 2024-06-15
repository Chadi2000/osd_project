import React, { useState } from 'react';
import './Input.css';

const Input = ({ label, type }) => {

  const [placeholder, setPlaceholder] = useState('');

  const handleFocus = () =>{
    setPlaceholder(label)
  }

  const handleBlur = () =>{
    setPlaceholder('')
  }


  return (
    <div className='input_container'>
      <label className='textLabel'>{label}</label>
      <input type={type} id="input" name='input' placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
}

export default Input;
