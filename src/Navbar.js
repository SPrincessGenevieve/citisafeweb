import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./styles.css";
import logo from "./assets/logo.png";
import { Dashboard, Widgets } from "@mui/icons-material";

export default function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <nav className="nav">
      <div className="toggle-button" onClick={toggleNav}>
        <Widgets
          style={{ fontSize: 40, marginLeft: 30, color: "#3e7c1f" }}
        ></Widgets>
      </div>

      <ul className={`nav-list ${isNavVisible ? "show" : ""}`}>
        <div className="image-logo">
          <img style={{ width: 200 }} src={logo}></img>
        </div>
        <CustomLink to="/dashboard">Home</CustomLink>
        <CustomLink to="/violation">Records</CustomLink>
        <CustomLink to="/user">Users</CustomLink>
        <CustomLink to="/violationList">Violation</CustomLink>
        <li className={`nav-item logout-item ${isNavVisible ? "show" : ""}`}>
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
