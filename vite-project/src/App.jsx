import {useState,useEffect} from 'react';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import StudentPage from './pages/Student';
import Jury from './pages/Jury';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"; // Importez Routes et Route
import Cookies from 'js-cookie';




function App() {

  const PrivateRoute = ({ children, role }) => {
    const userCookie = Cookies.get('userCookie');
    const userData = userCookie ? JSON.parse(userCookie) : {};
  
    if (userData.profile != null && userData.profile === role) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  handleLogOutClick = () => {
    Cookies.remove('userCookie');
    return <Navigate to="/login" />;
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={
          <PrivateRoute role="ADM">
            <AdminPage handleLogOutClick={handleLogOutClick} />
          </PrivateRoute>
        } />
        <Route path="/student" element={
          <PrivateRoute role="ETU">
            <StudentPage handleLogOutClick={handleLogOutClick} />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App;
