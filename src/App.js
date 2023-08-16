import './App.css';
import LoginPage from './pages/Login/LoginPage';
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Violation from './pages/Violation/Violation';
import Profile from './pages/Profile/Profile';
import UserControl from './pages/UserControl/UserControl';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [handleDashboard, setHandleDashboard] = React.useState(true)


  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
        

        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/violation" element={<Violation />} />
            <Route path="/user" element={<UserControl />} />
            <Route path="/profile" element={<Profile />} />      
        </Routes>
    </div>
  );
}

export default App;
