import React from "react";
import "./styles.css";
function SelectRound({ title, height, width, selection, onChange }) {
  const selectOptions =
    selection === "position" ? (
      <select
        style={{ width: width, height: height }}
        className="select-css"
        id="myGender"
        name="gender"
        onChange={(e) => onChange(e.target.value)}
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
        onChange={(e) => onChange(e.target.value)}

      >
        <option></option>
        <option value="ADMIN">Admin</option>
        <option value="TRESURER">Treasurer</option>
        <option value="ENFORCER">Enforcer</option>
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
