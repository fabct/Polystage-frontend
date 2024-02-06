import React from 'react';
import {useState} from 'react';
import logo from '../assets/logo.svg';
import '../index.css'

import LoginContent from '../contents/Login/LoginContent';
//import Content from '../Componement/LoginContent.jsx';

const LoginPage = (props) => {

  const [forgotPassword, setForgotPassword] = useState(false); 

  const handleForgotPassword = (e) => {
    // Mettez en œuvre la logique pour gérer le mot de passe oublié ici
    console.log('Forgot Password clicked');
    setForgotPassword(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateAreas: `'logo title .' '. content .'`, gridTemplateColumns:'25% 50% 25%' ,gridTemplateRows: 'auto 1fr auto', backgroundColor :'#14AEEF', height:'100%', padding: '42px 55px 60px 55px'}}>
      <div style={{ gridArea: 'logo', textAlign: 'center',marginTop:'75px',marginBottom:'63px'}}>
        <img src={logo} alt="Logo" style={{width:'100%', height:'80%'}}/>
      </div>
      <div style={{ gridArea: 'title', textAlign: 'center', marginTop:'80px', marginBottom:'63px' ,color:'white', fontFamily: 'CalibriRegular', fontSize: '64px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>
        Internship Manager
      </div>
      <LoginContent 
        loginError={props.loginError}
        forgotPassword={forgotPassword}
        content='content'
        usernameValue={props.username}
        usernameOnChange={props.handleUsernameChange}
        passwordValue={props.password}
        passwordOnChange={props.handlePasswordChange}
        loginHandle={props.handleLogin}
        handleForgotPassword={handleForgotPassword}
      />
    </div>
  );
};

export default LoginPage;