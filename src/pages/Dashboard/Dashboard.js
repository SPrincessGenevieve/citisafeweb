import React from "react";
import "./../Dashboard/styles.css";
import Navbar from "./../../Navbar";
import ChartA from "../../components/ChartA";
import ChartC from "../../components/ChartC";
import ChartD from "../../components/ChartD";
import sun from "./../../assets/sun.png";
import { Button, Modal } from "@mui/material";

function Dashboard(props) {
  return (
    <div>
      <Navbar className="nav"></Navbar>
      <div className="whiteContainer">
        <div className="row">
          <div className="greeting">
            <div>
              <img
                style={{ height: 100, width: 100, borderRadius: 100 }}
                src={sun}
              ></img>
            </div>
            <p
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Good morning!
            </p>
            <h1 style={{ textAlign: "center", fontSize: 50, color: "black" }}>
              10:29
            </h1>
            <p style={{ textAlign: "center", color: "black" }}>
              Wednesday, October 11, 2023
            </p>
          </div>
          <div className="chartA-container">
            <div className="chartA">
              <div
                style={{
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    marginLeft: 60,
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  Total number of violations
                </p>
                <div className="title-container">
                  <p className="title-date">Monthly</p>
                </div>
              </div>
              <ChartA></ChartA>
            </div>
          </div>
        </div>
      </div>
      <div className="whiteContainer1">
        <div className="row2">
          <div className="total">
            <h1>TOTAL</h1>
            <h1
              style={{ textAlign: "center", fontSize: 100, color: "#366B1B" }}
            >
              13
            </h1>
            <p
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 25,
                fontWeight: "bold",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              VIOLATIONS TODAY
            </p>
          </div>
          <div className="chartC-container">
            <div className="chartC">
              <div
                style={{
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: -30,
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  VIOLATION TRACKER
                </p>
              </div>
              <ChartC></ChartC>
            </div>
          </div>
          <div className="chartC-container">
            <div className="chartC">
              <div
                style={{
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    marginLeft: 60,
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  Total number of violations
                </p>
                <div className="title-container">
                  <p className="title-date">Monthly</p>
                </div>
              </div>
              <ChartC></ChartC>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
