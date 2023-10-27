import { Visibility } from "@mui/icons-material";
import React, { useState } from "react";

function InputCss({ title, type }) {
  return (
    <>
      <p className="title-css">{title}</p>
      <div className="visibility-container"></div>

      <input type={type} className="input-css"></input>
    </>
  );
}

export default InputCss;
