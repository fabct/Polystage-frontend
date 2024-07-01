import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import StudentPage from './contents/Student/StudentContent';
import FormCreator from './contents/Form/FormCreator';
import Jury from './contents/Jury/Jury';

import {Routes, Route} from "react-router-dom"; // Importez Routes et Route
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormRespond from './contents/Form/FormRespond';
import GenericPage from './pages/GenericPage';

function PrivateRoute({ children, ...props }) {
  const navigate = useNavigate();
  const userCookie = Cookies.get('userCookie');
  let userData = {};

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing userCookie:', error);
    }
  }

  useEffect(() => {
    if (!userData.token || userData.profile !== props.role) {
      navigate('/');
    }
  }, [userData, navigate]);

  return userData.token ? children : null;
}

function App() {

  const navigate = useNavigate(); 
  const [newformId, setNewFormId] = useState(null);

  const handleLogOutClick = () => {
    Cookies.remove('userCookie',{
      sameSite: 'none', // Set SameSite attribute
      secure: true, // Set Secure attribute
    });
    navigate('/'); // Use navigate here
};

  const role = ["ETU", "ENS","PRO"]

  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute role="ADM"><AdminPage  handleLogOutClick={handleLogOutClick} setNewFormId={setNewFormId}/></PrivateRoute>}/>
        <Route path="/admin/form/:formId" element={<PrivateRoute role="ADM"><FormCreator id={newformId} handleLogOutClick={handleLogOutClick}/></PrivateRoute>}/>
        <Route path="/student" element={<PrivateRoute role="ETU"><GenericPage handleLogOutClick={handleLogOutClick} setNewFormId={setNewFormId}/></PrivateRoute>}/>
        <Route path="/student/form/:formId" element={<PrivateRoute role="ETU"><FormRespond id={newformId} handleLogOutClick={handleLogOutClick}/></PrivateRoute>}/>
        <Route path="/teacher" element={<PrivateRoute role="ENS"><GenericPage handleLogOutClick={handleLogOutClick} setNewFormId={setNewFormId}/></PrivateRoute>}/>
        <Route path="/tutor" element={<PrivateRoute role="TUT"><GenericPage handleLogOutClick={handleLogOutClick} setNewFormId={setNewFormId}/></PrivateRoute>}/>
      </Routes>
  )
}

export default App;
