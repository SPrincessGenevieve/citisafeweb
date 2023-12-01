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
import axios from "./plugins/axios";
import { useEffect } from "react";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.setIsLoggedIn);

  const Token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://etcmf.keannu1.duckdns.org/ws/ticketnotification/"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data.type === "ticket.notification" ||
        data.type === "ticket.status_update"
      ) {
        const datatype = data.type;
        const datamessage = data.message;

        console.log(datatype, datamessage);

        alert("There has been update of the RECORDS table!");
      }
    };

    return () => {
      socket.close();
    };
  }, [Token]);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/violation"
            element={isAuthenticated ? <Violation /> : <Navigate to="/" />}
          />
          <Route
            path="/user"
            element={isAuthenticated ? <UserControl /> : <Navigate to="/" />}
          />
          <Route
            path="/violationList"
            element={isAuthenticated ? <ViolationList /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
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
