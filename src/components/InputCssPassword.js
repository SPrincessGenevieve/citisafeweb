import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function InputCssPassword({ title, type }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <p className="title-css">{title}</p>

      <div className="visibility-container">
        <IconButton
          style={{ backgroundColor: "transparent", border: 0 }}
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>

      <input type={passwordVisible ? "text" : type} className="input-css" />
    </>
  );
}

export default InputCssPassword;
