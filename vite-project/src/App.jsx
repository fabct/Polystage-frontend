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
import Confidentiel from './contents/InformationComplémentaire/Confidentiel';

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
    if (!userData.token) {
      console.log('User not logged in');
      props.handleLogOutClick();
      navigate('/');
      return;
  }

    if (props.role) {
      if (Array.isArray(props.role)) {
        // If role is an array, check if userData.profile is in that array
        if (!props.role.includes(userData.profile)) {
          console.log('User does not have the right role');
          props.handleLogOutClick();
          navigate('/');
          return;
        }
      } else {
        // If role is not an array, check if userData.profile matches the role
        if (userData.profile !== props.role) {
          console.log('User does not have the right role');
          props.handleLogOutClick();
          navigate('/');
          return;
        }
      }
    }
  }, [userData, navigate, props]);

  return userData.token ? children : null;
}

function App() {

  const navigate = useNavigate(); 
  const [objectId, setObjectId] = useState(null);
  const [create, setCreate] = useState(false);

  const role = ['ETU', 'ENS', 'PRO', 'TUT'];

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
        <Route path="/:roleId" element={<PrivateRoute role={role} handleLogOutClick={handleLogOutClick}><GenericPage handleLogOutClick={handleLogOutClick} setObjectId={setObjectId}/></PrivateRoute>}/>
        <Route path="/:roleId/form/:formId" element={<PrivateRoute role={role} handleLogOutClick={handleLogOutClick}><FormRespond objectId={objectId} handleLogOutClick={handleLogOutClick}/></PrivateRoute>}/>
        <Route path="/confidentiel" element={<Confidentiel />}/>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
  )
}

export default App;
