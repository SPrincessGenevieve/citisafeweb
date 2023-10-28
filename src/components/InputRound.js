import React from "react";
import "./styles.css";
function InputRound({ width, height, onChange, title, type }) {
  return (
    <>
      <p className="title-form">{title}</p>
      <input
        className="styles-input"
        style={{
          width: width,
          height: height,
        }}
        type={type}
        onChange={onChange}
      ></input>
    </>
  );
}

export default InputRound;
