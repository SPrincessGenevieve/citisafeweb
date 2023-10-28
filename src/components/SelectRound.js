import React from "react";
import "./styles.css";
function SelectRound({ title, height, width }) {
  const selectGender = (
    <select
      style={{ width: width, height: height }}
      className="select-css"
      id="myGender"
      name="gender"
    >
      <option></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Others">Others</option>
    </select>
  );

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <p className="title-form">{title}</p>
        <div>{selectGender}</div>
      </div>
    </>
  );
}

export default SelectRound;
