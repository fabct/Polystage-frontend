import React from 'react';
import LoginContent from '../contents/Login/LoginContent';
import logo from '../assets/logo.svg';
import '../index.css'
import axios from 'axios';
import {useState} from 'react';
import Cookies from 'js-cookie';

//import Content from '../Componement/LoginContent.jsx';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false); 

  let data = {};
  /*
   dans cette partie on va s'occuper de la requete pour connecter l'utilisateur

  */
  const  handleLogin = async() => {
    // verif si les champs sont vides
    console.log('Username:', username);
    console.log('Password:', password);
    // Vous pouvez envoyer les données à votre backend pour la validation
    try {
      const response = await apiService.post('login/', {
        email: username,
        password: password,
      });
      Cookies.set('userCookie', {
        token: response.data.token,
        user_id: response.data.id,
        profile: response.data.profile,
      });
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setLoginError(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    /*
   dans cette partie on va s'occuper de la requete pour changer le mot de passe
   */
  
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
        loginError={loginError}
        forgotPassword={forgotPassword}
        content='content'
        usernameValue={username}
        usernameOnChange={handleUsernameChange}
        passwordValue={password}
        passwordOnChange={handlePasswordChange}
        loginHandle={handleLogin}
        handleForgotPassword={handleForgotPassword}
      />
    </div>
  );
};

export default LoginPage;