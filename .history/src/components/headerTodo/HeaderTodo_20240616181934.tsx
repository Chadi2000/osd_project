import React from 'react';
import './headerTodo.css';

const HeaderTodo = ({imgSrc,imgWidth, imgHeight,status,color}) => {
  return (
    <div className='header_container'>
      <img style={{width:imgWidth, height: imgHeight,backgroundColor:color,
        backgroundClip:'padding-box',opacity:'1'

       }} src={imgSrc} alt="" />
      <h2>{status}</h2>
    </div>
  )
}

export default HeaderTodo
