import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import FormCreator from './contents/Form/FormCreator';

import {Routes, Route} from "react-router-dom"; // Importez Routes et Route
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormRespond from './contents/Form/FormRespond';
import GenericPage from './pages/GenericPage';
import { get } from './service/service';

function PrivateRoute({ children, ...props }) {
  const navigate = useNavigate();
  const userCookie = Cookies.get('userCookie');
  let userData = {};

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
      console.log(userData);
    } catch (error) {
      console.error('Error parsing userCookie:', error);
    }
  }

  useEffect(() => {
    if (!userData.token || userData.profile !== props.role) {
      console.log('User not logged in or wrong role')
      props.handleLogOutClick();
      navigate('/');
    }
  }, [userData, navigate]);

  return userData.token ? children : null;
}

function App() {

  const navigate = useNavigate(); 
  const [objectId, setObjectId] = useState(null);
  const [create, setCreate] = useState(false);

  const handleLogOutClick = () => {
    get('logout/').then(data => {
      console.log(data);
      Cookies.remove('userCookie',{
        sameSite: 'none', // Set SameSite attribute
        secure: true, // Set Secure attribute
      });
    });
    navigate('/'); // Use navigate here
  };

  return (
      <Routes>
        <Route path="/" element={<LoginPage handleLogOutClick={handleLogOutClick}/>} />
        <Route path="/admin" element={<PrivateRoute role="ADM" handleLogOutClick={handleLogOutClick}><AdminPage  handleLogOutClick={handleLogOutClick} setObjectId={setObjectId} setCreate={setCreate}/></PrivateRoute>}/>
        <Route path="/admin/form/:formId" element={<PrivateRoute role="ADM" handleLogOutClick={handleLogOutClick}><FormCreator id={objectId} handleLogOutClick={handleLogOutClick} create={create}/></PrivateRoute>}/>
        <Route path="/student" element={<PrivateRoute role="ETU" handleLogOutClick={handleLogOutClick}><GenericPage handleLogOutClick={handleLogOutClick} setObjectId={setObjectId}/></PrivateRoute>}/>
        <Route path="/student/form/:formId" element={<PrivateRoute role="ETU" handleLogOutClick={handleLogOutClick}><FormRespond id={objectId} handleLogOutClick={handleLogOutClick}/></PrivateRoute>}/>
        <Route path="/teacher" element={<PrivateRoute role="ENS" handleLogOutClick={handleLogOutClick}><GenericPage handleLogOutClick={handleLogOutClick} setObjectId={setObjectId}/></PrivateRoute>}/>
        <Route path="/tutor" element={<PrivateRoute role="TUT" handleLogOutClick={handleLogOutClick}><GenericPage handleLogOutClick={handleLogOutClick} setObjectId={setObjectId}/></PrivateRoute>}/>
      </Routes>
  )
}

export default App;
