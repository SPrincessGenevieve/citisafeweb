import './App.css';
import LoginPage from './pages/Login/LoginPage';
import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Violation from './pages/Violation/Violation';
import Profile from './pages/Profile/Profile';
import UserControl from './pages/UserControl/UserControl';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/violation" element={isAuthenticated ? <Violation /> : <Navigate to="/" replace />} />
        <Route path="/user" element={isAuthenticated ? <UserControl /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
