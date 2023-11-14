import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function InputCssPassword({ title, type, onChange, value, color, border }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <p className="title-css">{title}</p>

      <div className="visibility-container">
        <IconButton
          style={{
            backgroundColor: "transparent",
            border: 0,
            color: color,
            border: border,
          }}
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>

      <input
        type={passwordVisible ? "text" : type}
        onChange={onChange}
        value={value}
        className="input-css"
      />
    </>
  );
}

export default InputCssPassword;
