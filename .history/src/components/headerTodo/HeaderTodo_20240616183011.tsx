import React from 'react';
import './headerTodo.css';

const HeaderTodo = ({imgSrc,imgWidth, imgHeight,status,imgColor}) => {
  return (
    <div className='header_container'>
      <img style={{width:imgWidth, height: imgHeight,backgroundColor:imgColor,
        backgroundClip:'padding-box',opacity:'1'

       }} src={imgSrc} alt="" />
      <h2 style={{color:'#FFFFFF',
        textAlign:'left',fontSize:'18px', lineHeight:'21px'

      }}>{status}</h2>
    </div>
  )
}

export default HeaderTodo
