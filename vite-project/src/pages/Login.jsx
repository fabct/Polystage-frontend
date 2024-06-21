import React from 'react';
import LoginContent from '../contents/Login/LoginContent';
import logo from '../assets/logo.svg';
import '../index.css'
import {post} from '../service/service';
import {useState} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false); 
  const [verifyCode, setVerifyCode] = useState(false);
  const navigate = useNavigate();
  /*
   dans cette partie on va s'occuper de la requete pour connecter l'utilisateur

  */
   const move = (data) => {
    switch (data.profile) {
      case 'ADM':
        navigate('/admin');
        break;
      case 'ETU':
        navigate('/student');
        break;
      case 'JUR':
        navigate('/jury');
        break;
      case 'PRO':
        navigate('/jury');
        break;
      default:
        navigate('/');
    }
  }

  const handleLogin = () => {
    post('login/', {
        email: username,
        password: password,
      }).then(data => {
        console.log(data);
        Cookies.set('userCookie', JSON.stringify({
          token: data.token,
          user_id: data.user_id,
          profile: data.profile,
        }), {
          sameSite: 'none', // Set SameSite attribute
          secure: true, // Set Secure attribute
        });
        move(data);
      }).catch((error) =>{
        console.error('Erreur de connexion:', error);
        setLoginError(true);
      });
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyCode = () => {
    console.log('Verify Code clicked');
    setVerifyCode(true);
  }
  /*
  dans cette partie on va s'occuper de la requete pour changer le mot de passe
  */
  
  const handleForgotPassword = (e) => {
    // Mettez en œuvre la logique pour gérer le mot de passe oublié ici
    console.log('Forgot Password clicked');
    setForgotPassword(true);
    // implémenter l'appelle a l'api pour changer le mot de passe
  };

  return (
    <div style={{ display: 'grid', gridTemplateAreas: `'logo title .' '. content .'`, gridTemplateColumns:'25% 50% 25%' ,gridTemplateRows: 'auto 1fr auto', backgroundColor :'#14AEEF', height:'100%', padding: '42px 55px 60px 55px'}}>
      <div style={{ gridArea: 'logo', textAlign: 'center',marginTop:'75px',marginBottom:'63px'}}>
        <img src={logo} alt="Logo" style={{width:'100%', height:'80%'}}/>
      </div>
      <div style={{ gridArea: 'title', textAlign: 'center', marginTop:'80px', marginBottom:'63px' ,color:'white', fontFamily: 'CalibriRegular', fontSize: '64px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>
        Polystage
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
        handleVerifyCode={handleVerifyCode}
        verifyCode={verifyCode}
      />
    </div>
  );
};

export default LoginPage;