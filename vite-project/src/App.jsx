import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import StudentPage from './pages/Student';
import Jury from './pages/Jury';

import {Routes, Route, Navigate} from "react-router-dom"; // Importez Routes et Route
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
  
  const navigate = useNavigate(); // Use the hook here

  const handleLogOutClick = () => {
    Cookies.remove('userCookie',{
      sameSite: 'none', // Set SameSite attribute
      secure: true, // Set Secure attribute
    });
    navigate('/'); // Use navigate here
  };

  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute role="ADM"><AdminPage  handleLogOutClick={handleLogOutClick}/></PrivateRoute>} />
        <Route path="/student" element={<PrivateRoute role="ETU"><StudentPage handleLogOutClick={handleLogOutClick}/></PrivateRoute>} />
      </Routes>
  )
}

export default App;
