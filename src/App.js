import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Violation from "./pages/Violation/Violation";
import Profile from "./pages/Profile/Profile";
import UserControl from "./pages/UserControl/UserControl";
import ViolationList from "./pages/ViolationList/ViolationList";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import { useEffect } from "react";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.setIsLoggedIn);

  const Token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("Attempting to connect to WebSocket...");

    const socket = new WebSocket(
      "wss://etcmf.keannu1.duckdns.org/ws/ticketnotification/"
    );

    socket.onopen = () => {
      console.log("WebSocket connection opened!");
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed!", event);
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
