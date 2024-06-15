import React, { useState } from 'react'
import './Login.css'
import Logo from '../../assets/Logo.png';
import Man from '../../assets/Man.png';
import Woman from '../../assets/Woman.png';
import Input from '../../components/input/Input.tsx';
import axios from 'axios';
import { useAuth } from '../../AuthContext.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (newEmail) =>{
    setEmail(newEmail);
  }
  const handlePassword = (newPassword) =>{
    setPassword(newPassword);
  }

  const handleLogin = () =>{
    const data = {
      Email: email,
      Password: password
    }
    const url = 'https://localhost:44387/api/Test/Login';

    axios.post(url,data).then((result)=>{

      if (result.data === 'User is valid') {
        login();
        navigate('/todo');
      } else{
        alert('Invalid credentials');
      }

    }).catch((error) =>{
      alert(error);
    })
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

        <button className='signIn_button' onClick={() => handleLogin()}>SIGN IN</button>


      </div>


  )
}

export default Login
