import React from 'react'
import './Login.css'
import Logo from '../../assets/Logo.png';
import Man from '../../assets/Man.png';
import Woman from '../../assets/Woman.png';

const Login = () => {
  return (
    <div className='app_login'>

      <div className='app_login-left_side'>
        <div className='app_login-left_side-logo'>
          <img src={Logo} alt="Logo Image" className='image'/>
        </div>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>

      <div className='app_login-right_side'>

      </div>

    </div>
  )
}

export default Login
