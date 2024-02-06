import {useState,useEffect} from 'react';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import StudentPage from './pages/Student';

function App() {

  const [estLog, setEstLog] = useState(true); 
  // multiple userType a (admin), s (student), j (jury), t (tutor)
  const [userType, setUserType] = useState('a');
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Cette fonction sera appelée à chaque changement dans estLog
    if (estLog) {
      setUserType('e');  // Vous pouvez ajouter la logique pour les autres types ici
    }
  }, [estLog]);

  const handleLogin = () => {
    // Mettez en œuvre la logique de connexion ici
    console.log('Username:', username);
    console.log('Password:', password);
    // Vous pouvez envoyer les données à votre backend pour la validation
    if(password === 'admin' && username === 'admin'){
      setLoginError(false)
      setEstLog(true)
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

  if(estLog){
    if(userType === 'a'){
      return <AdminPage /> ;
    }
    if(userType === 'e'){
      return <StudentPage />
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
