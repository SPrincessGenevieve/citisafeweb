import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Violation from "./pages/Violation/Violation";
import Profile from "./pages/Profile/Profile";
import UserControl from "./pages/UserControl/UserControl";
import ViolationList from "./pages/ViolationList/ViolationList";
import ErrorBoundary from "./ErrorBoundary";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import AlertPop from "./pages/ALERT/AlertPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.setIsLoggedIn);
  const [showNotification, setShowNotification] = useState(false);
  const closeNotif = () => {
    setShowNotification(false);
  };
  return (
    <div className="container">
      <Router>
        <AlertPop showNotification={showNotification} onClose={closeNotif} />

        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Dashboard />
                  <AlertPop
                    showNotification={showNotification}
                    onClose={closeNotif}
                  />
                </>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <>
                  <Dashboard />
                  <AlertPop
                    showNotification={showNotification}
                    onClose={closeNotif}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/violation"
            element={
              isAuthenticated ? (
                <>
                  <Violation />
                  <AlertPop
                    showNotification={showNotification}
                    onClose={closeNotif}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/user"
            element={
              isAuthenticated ? (
                <>
                  <UserControl />
                  <AlertPop
                    showNotification={showNotification}
                    onClose={closeNotif}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/violationList"
            element={
              isAuthenticated ? (
                <>
                  <ViolationList />
                  <AlertPop
                    showNotification={showNotification}
                    onClose={closeNotif}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <>
                  <Profile />
                  <AlertPop
                    showNotification={showNotification}
                    onClose={closeNotif}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/update"
            element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/" />}
          />
          <Route
            path="/reset_password/:uid/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
