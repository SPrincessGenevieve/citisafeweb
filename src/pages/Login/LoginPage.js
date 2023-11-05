import React, { useState } from "react";
import "./login.css";
import enforcer from "./../../assets/enforcer.png";
import { useNavigate } from "react-router-dom";
import InputCss from "../../components/InputCss";
import InputCssPassword from "../../components/InputCssPassword";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function LoginPage({ onClick }) {
  const navigation = useNavigate();
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    navigation("/dashboard");
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const handleSendPasswordReset = () => {
    alert("Email sent!", email);

    closeForgotPasswordModal();
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
              <Button
                style={{ color: "white" }}
                onClick={openForgotPasswordModal}
              >
                Forgot Password?
              </Button>
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
      <Dialog
        open={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "50%",
            minHeight: "40%",
          },
        }}
      >
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
          <p>Enter your email address to reset your password.</p>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForgotPasswordModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendPasswordReset} color="primary">
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginPage;
