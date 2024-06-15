import React, { useState } from 'react';
import './Input.css';

const Input = ({ label, placeholder, type, onValueChange }) => {

  const [placeholderInput, setPlaceholderInput] = useState('');

  const handleFocus = () =>{
    setPlaceholderInput(placeholder)
  }

  const handleBlur = () =>{
    setPlaceholderInput('')
  }
  
  const handleChange = (e) =>{
    onValueChange(e.target.value);
  }


  return (
    <div className='input_container'>
      <label className='textLabel'>{label}</label>
      <input type={type} id="input" name='input' placeholder={placeholderInput} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
    </div>
  );
}

export default Input;
