import React from "react";
import "./login.css";
import InputS from "./../../components/InputS";
import ConstButton from "../../components/ConstButton";
import TextBtn from "../../components/TextBtn";
import KeyboardWrapper from "../../components/KeyboardWrapper";
import enforcer from "./../../assets/enforcer.png";
import logo from "./../../assets/logo.png";
import BG from "./../../assets/bg.png";
import { useNavigate } from "react-router-dom";
import InputCss from "../../components/InputCss";
import { Button } from "@mui/material";
import InputCssPassword from "../../components/InputCssPassword";

function LoginPage({ onClick }) {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation("/dashboard");
  };
  return (
    <div className="containerLogin">
      <div className="subcontainer-login">
        <div className="white-container">
          <div className="image-container">
            <img className="image-css" src={enforcer}></img>
          </div>
          <div className="input-container">
            <div className="input-subcontainer">
              <InputCss title={"username"}></InputCss>
              <InputCssPassword
                type={"password"}
                title={"password"}
              ></InputCssPassword>
            </div>
            <div
              style={{
                width: 220,
                textAlign: "center",
              }}
            >
              <Button style={{ color: "white" }}>Forgot Password?</Button>
            </div>
            <div>
              <Button
                onClick={handleLogin}
                style={{
                  backgroundColor: "#3e7c1f",
                  color: "white",
                  width: "17rem",
                  borderRadius: 20,
                  marginTop: 20,
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
