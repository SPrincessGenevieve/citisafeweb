import React from "react";
import "./styles.css";
function SelectRound({ title, height, width, selection }) {
  const selectOptions =
    selection === "position" ? (
      <select
        style={{ width: width, height: height }}
        className="select-css"
        id="myGender"
        name="gender"
      >
        <option></option>
        <option value="Traffic Aid">Traffic Aid</option>
        <option value="Office Clerk">Office Clerk</option>
        <option value="Traffic Enforcer">Traffic Enforcer</option>
        <option value="Others">Others</option>
      </select>
    ) : (
      <select
        style={{ width: width, height: height }}
        className="select-css"
        id="myRole"
        name="role"
      >
        <option></option>
        <option value="Admin">Admin</option>
        <option value="Treasurer">Treasurer</option>
        <option value="Officer">Officer</option>
      </select>
    );

  return (
    <div style={{ marginTop: 10 }}>
      <p className="title-form">{title}</p>
      <div>{selectOptions}</div>
    </div>
  );
}

export default SelectRound;
