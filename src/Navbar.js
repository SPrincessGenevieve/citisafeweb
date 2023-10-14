import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./styles.css";
import logo from "./assets/logo.png";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const handleToggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="nav">
      <div className="toggle-button" onClick={handleToggleNav}>
        {/* You can use any icon or element for the toggle button */}
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-list ${showNav ? "show" : ""}`}>
        <div className="image-logo">
          <img src={logo}></img>
        </div>
        <CustomLink to="/dashboard">Home</CustomLink>
        <CustomLink to="/violation">Records</CustomLink>
        <CustomLink to="/user">Users</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
        <li className={`nav-item logout-item ${showNav ? "show" : ""}`}>
          <CustomLink className="logout-link" to="/">
            Logout
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
