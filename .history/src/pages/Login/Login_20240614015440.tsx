import React from 'react'
import './Login.css'
import Logo from '../../assets/Logo.png';
import Man from '../../assets/Man.png';
import Woman from '../../assets/Woman.png';

const Login = () => {
  return (

      <div className='app_login'>
        <div className='app_login-left_side-logo'>
          <img src={Logo} alt="Logo Image" className='image'/>
        </div>
        <div className='app_login-left_side-people'>
          <img className='woman' src={Woman} alt="Woman" />
          <img className='man' src={Man} alt="Man" />
        </div>

        <div className='app_login-right_side'>
          <div className='app_login-right_side-title'>
            Time to Work!
          </div>
        </div>
      </div>


  )
}

export default Login
