import React, { useState } from 'react';
import './Input.css';

const Input = ({ label, placeholder, type }) => {

  const [placeholderInput, setPlaceholderInput] = useState('');

  const handleFocus = () =>{
    setPlaceholderInput(placeholder)
  }

  const handleBlur = () =>{
    setPlaceholderInput('')
  }


  return (
    <div className='input_container'>
      <label className='textLabel'>{label}</label>
      <input type={type} id="input" name='input' placeholder={placeholderInput} onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
}

export default Input;
