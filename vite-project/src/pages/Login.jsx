import React from 'react';
import {LoginContent} from '../contents/Login/LoginContent';
import {post} from '../service/service';
import {useState} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {role, role_str} from '../service/app-local';
import VerifyCode from '../contents/Login/VerifyCode';
import PasswordChange from '../contents/Login/PasswordChange';
import PasswordForgot from '../contents/Login/PasswordForgot';
import {ErrorAlert, MessageAlert} from '../contents/CommunContent/Alert';


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [notif, setNotif] = useState('');
  const [loginNotif, setLoginNotif] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [codeIsVerified, setCodeIsVerified] = useState(false);
  const navigate = useNavigate();
  /*
   dans cette partie on va s'occuper de la requete pour connecter l'utilisateur

  */
   const move = (data) => {
    switch (data.profile) {
      case role[0]:
        navigate('/admin');
        break;
      case role[1]:
      case role[2]:
      case role[3]:
      case role[4]:
        navigate(`/${role_str[data.profile]}`);
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
        if (data.error) {
          console.error(data.error);
          setLoginError(true);
          setError(data.error);
        }
        else{
        Cookies.set('userCookie', JSON.stringify({
          token: data.token,
          user_id: data.user_id,
          profile: data.profile,
        }), {
          sameSite: 'none', // Set SameSite attribute
          secure: true, // Set Secure attribute
        });
        move(data);
      }
      })
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCodeValue(e.target.value);
  }

  
  /*
  dans cette partie on va s'occuper de la requete pour changer le mot de passe
  */
  
  const handleForgotPassword = (e) => {
    console.log('Forgot Password clicked');
    setForgotPassword(true);
    setLoginError(false);
    setError('');
    setPassword('');
    setUsername('');
  };

  const handleVerifyUser = () => {
    setVerifyCode(true);
    setForgotPassword(false);
    post('sendCodeMail/', {email: username}).then(data => {
      setNotif('Email envoyé avec succès');
      setLoginNotif(true);
    }
    )
  }

  const handleVerifyCode = () => {
    post('verifyCode/', {email: username, code: codeValue}).then(data => {
      if(data.error){
        setLoginError(true);
        setError(data.error);
      }
      else{
        setCodeIsVerified(true);
        setVerifyCode(false);
        setCodeValue('');
      }
    })
  }

  const handleResetPassword = () => {
    // implémenter l'appelle a l'api pour changer le mot de passe
    post('password/', {email: username,code:codeValue ,password1: password, password2: confirmPassword}).then(data => {
      if(data.error){
        setLoginError(true);
        setError(data.error);
      }
      else{
        setNotif('Mot de passe changé avec succès');
        setLoginNotif(true);
        setCodeIsVerified(false);
        setUsername('');
        setCodeValue('');
        setPassword('');
        setConfirmPassword('');
      }
    })
  }

  const renderLoginContent = () => {
    if(forgotPassword){
      return(
        <PasswordForgot 
          username={username}
          usernameChange={handleUsernameChange}
          handleVerifyUser={handleVerifyUser}
        />
      );
    }
    if(verifyCode){
      return (
        <VerifyCode 
          codeValue={codeValue}
          codeOnChange={handleCodeChange}
          handleVerifyCode={handleVerifyCode}
        />
      );
    }
    if(codeIsVerified){
      return(
        <PasswordChange 
          codeValue={codeValue}
          codeOnChange={handleCodeChange}
          handleResetPassword={handleResetPassword}
          handlePasswordChange={handlePasswordChange}
          handleConfirmPassword={handleConfirmPasswordChange}
          password={password}
          confirmPassword={confirmPassword}
        />
      );
    }
    else{
      return(
        <LoginContent 
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
      );
    }
  }

  return (
      <div className='grid login-grid'>
        {loginError === true ? <ErrorAlert message={error} />: null}
        {loginNotif === true ? <MessageAlert message={notif} />: null}
        <div className="row">
          <div className='my-5' style={{gridRow: 2,textAlign: 'center',color:'white', fontFamily: 'CalibriRegular', fontSize: '64px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>
            Polystage
          </div>
          <div className='col-md-10 offset-md-1'>
            {renderLoginContent()}
          </div>
        </div>
      </div>
  );
};

export default LoginPage;