import React, { useState } from "react";
import "./styles.css";
import Navbar from "../../Navbar";
import { IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordField from "../../components/PasswordField";
import ConstButton from "./../../components/ConstButton";
import update from "./../../assets/udpate.jpg";

function UpdatePassword({ label, type }) {
  return (
    <div className="updateContainer">
      <Navbar></Navbar>

      <div className="inner-update">
        <div className="inner-container-update">
          <img className="update-img" src={update}></img>
          <p style={{ textAlign: "center" }}>
            Password must contain one lowercase letter, one number, and be at
            least 6 characters long
          </p>
          <div className="input-up">
            <PasswordField
              type={"password"}
              label={"New Password"}
            ></PasswordField>
            <PasswordField
              type={"password"}
              label={"Confirm Password"}
            ></PasswordField>
          </div>
          <ConstButton
            title={"UPDATE PASSWORD"}
            marginTop={"10%"}
          ></ConstButton>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
