import React from 'react'
import './Input.css'
const Input = ({placeholder,type}: {placeholder: string,type:string}) => {
  return (
    <>
        <input type={type} id="input" name='input' placeholder={placeholder} />
    </>
  )
}

export default Input