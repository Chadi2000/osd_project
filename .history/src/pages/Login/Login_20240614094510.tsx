import React, { useState } from 'react'
import './Login.css'
import Logo from '../../assets/Logo.png';
import Man from '../../assets/Man.png';
import Woman from '../../assets/Woman.png';
import Input from '../../components/input/Input.tsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (newEmail) =>{
    setEmail(newEmail);
  }
  const handlePassword = (newPassword) =>{
    setPassword(newPassword);
  }

  return (

      <div className='app_login'>

        <div className='app_login-left_side-logo'>
          <img src={Logo} alt="Logo" className='image'/>
        </div>
        <div className='app_login-left_side-people'>
          <img className='woman' src={Woman} alt="Woman" />
          <img className='man' src={Man} alt="Man" />
        </div>

        <div className='app_login-right_side'>

        </div>

        <div className='app_login-right_side-title'>
            Time to Work!
        </div>
        <div className='email_input'>
          <Input label='Email' placeholder='user@example.com' type='email' onValueChange={handleEmail} />
        </div>

        <div className='password_input'>
          <Input label='Password' placeholder='**************' type='password' onValueChange={handlePassword} />
        </div>

        <button className='signIn_button'>SIGN IN</button>

        <p style={{color:'white'}}> new email: {email}</p> <br />
        <p style={{color:'white'}}> new password: {password} </p>


      </div>


  )
}

export default Login
