import React, { useState } from "react";
import "./styles.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

function SortDate() {
  const [date, setDate] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleDate = () => {
    setDate(!date);
  };

  return (
    <div className="container-datePick">
      <div className="container-date-btn">
        <Button onClick={handleDate} style={{ color: "black" }}>
          <CalendarMonth style={{ color: "green" }}></CalendarMonth>DATE
        </Button>
      </div>
      {date ? (
        <>
          <div className="calender-range-container">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
            <div className="confirm-btn-date">
              <Button onClick={handleDate} style={{ color: "green" }}>
                Confirm
              </Button>
              <Button onClick={handleDate} style={{ color: "red" }}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SortDate;
