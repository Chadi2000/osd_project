import React from 'react'
import './Input.css'
const Input = (label,placeholder,type) => {
  return (
    <>
        <label className='textLabel'>{label}</label>
        <input type={type} id="input" name='input' placeholder={placeholder} />
    </>
  )
}

export default Input