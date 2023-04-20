import React from 'react';
import { Image } from 'react-bootstrap';

function Login() {
  return (
    <div className='login-page'>
      <Image
        src='/images/groceries.png'
        style={{
          height: 'auto',
          width: '35rem',
        }}
      ></Image>
      <div class='loginContainer'>
        <h1 class='login-h1'>User Login</h1>

        <input
          type='text'
          placeholder='Enter Username'
          name='uname'
          required
        ></input>
        <input
          type='password'
          placeholder='Enter Password'
          name='psw'
          required
        ></input>
        <span class='psw'>
          Forgot <a href='/'>password?</a>
        </span>
        <button type='submit'>Login</button>
      </div>
    </div>
  );
}

export default Login;
