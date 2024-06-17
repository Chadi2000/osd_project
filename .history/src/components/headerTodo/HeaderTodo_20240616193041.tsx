import React from 'react';
import './headerTodo.css';

const HeaderTodo = ({imgSrc,imgWidth, imgHeight,status}) => {
  return (
    <div className='header_container'>
      <img style={{width:imgWidth, height: imgHeight,
        backgroundClip:'padding-box',opacity:'1', position:'absolute',left:'19px', top:'13px'

       }} src={imgSrc} alt="" />
      <h2 style={{color:'#FFFFFF',
        textAlign:'left',fontSize:'18px', lineHeight:'21px', alignItems:'center'

      }}>{status}</h2>
    </div>
  )
}

export default HeaderTodo
