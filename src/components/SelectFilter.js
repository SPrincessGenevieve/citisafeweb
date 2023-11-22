import * as React from "react";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SelectFilter({ label, value, checked, onClick }) {
  const [check, setCheck] = useState(true);

  const handleCheck = ({ onClicks }) => {
    setCheck(!check);

    if (typeof onClick === "function") {
      onClick(value);
    }

    if (onClicks && onClicks.length > 0) {
      onClicks.forEach((onClick) => {
        onClick();
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "5px",
        borderRadius: 10,
        height: "100%",
      }}
    >
      <Button onClick={handleCheck} value={value} checked={checked}>
        {check ? (
          <CheckBoxOutlineBlank
            style={{ fontSize: 30, color: "green" }}
          ></CheckBoxOutlineBlank>
        ) : (
          <CheckBoxOutlined
            style={{
              fontSize: 30,
              color: "green",
            }}
          ></CheckBoxOutlined>
        )}
      </Button>
      <p style={{ margin: "0", marginLeft: "5px" }}>{label}</p>
    </div>
  );
}
