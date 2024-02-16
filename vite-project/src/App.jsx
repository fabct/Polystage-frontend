import {useState,useEffect} from 'react';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import StudentPage from './pages/Student';
import Jury from './pages/Jury';

function App() {

  const [estLogAdm, setEstLogAdm] = useState(false); 
  const [estLogSt, setEstLogSt] = useState(false); 
  const [estLog, setEstLog] = useState(false); 
  // multiple userType a (admin), s (student), j (jury), t (tutor)
  const [userType, setUserType] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Cette fonction sera appelée à chaque changement dans estLog
    if (estLogAdm) {
      setUserType('a'); 
      setEstLog(true); // Vous pouvez ajouter la logique pour les autres types ici
    }
    if (estLogSt){
      setUserType('e');
      setEstLog(true);
    }
  }, [estLogAdm,estLogSt]);

  const handleLogin = () => {
    // Mettez en œuvre la logique de connexion ici
    console.log('Username:', username);
    console.log('Password:', password);
    // Vous pouvez envoyer les données à votre backend pour la validation
    if(password === 'admin' && username === 'admin'){
      setLoginError(false)
      setEstLogAdm(true)
    }
    else if(password === 'Dupond' && username === 'Dupond'){
      setLoginError(false)
      setEstLogSt(true)
    }
    else{
      setLoginError(true)
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogOutClick = () => {
    setEstLog(false)
    setEstLogAdm(false)
    setEstLogSt(false)
    setPassword('');
    setUsername('');
  };

  if(estLog){
    if(userType === 'a'){
      return <AdminPage 
            handleLogOutClick ={handleLogOutClick}
              /> ;
    }
    if(userType === 'e'){
      return <StudentPage 
              handleLogOutClick ={handleLogOutClick}
              />;
    }
    if(userType === 'j'){
      return <Jury />
    }
  }
  else{
    return (
      <LoginPage 
        handleLogin = {handleLogin}
        handleUsernameChange = {handleUsernameChange}
        handlePasswordChange = {handlePasswordChange}
        loginError = {loginError}
        password = {password}
        username = {username}
      />
    )
  }
}

export default App;
