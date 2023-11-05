import React from "react";
import "./login.css";
import enforcer from "./../../assets/enforcer.png";
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
      <div className="white-container">
        <div className="input-container">
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <InputCss title={"username"}></InputCss>
            </div>
            <div>
              <InputCssPassword
                type={"password"}
                title={"password"}
              ></InputCssPassword>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button style={{ color: "white" }}>Forgot Password?</Button>
              <Button
                onClick={handleLogin}
                style={{
                  backgroundColor: "#3e7c1f",
                  color: "white",
                  width: "17rem",
                  borderRadius: 20,
                  marginTop: 20,
                  border: "0.5px solid white",
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img className="image-css" src={enforcer}></img>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
