import React from "react";
import "./../Dashboard/styles.css";
import Navbar from "./../../Navbar";
import ChartA from "../../components/ChartA";
import ChartC from "../../components/ChartC";
import ChartD from "../../components/ChartD";
import sun from "./../../assets/sun.png";
import moon from "./../../assets/moon.png";
import { Button, Modal } from "@mui/material";
import StatusSelection from "../../components/StatusSelection";
import week from "./../../JSON/week.json";
import { useState, useEffect } from "react";

function Dashboard(props) {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [image, setImage] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to update the time and greeting based on the time of day
    function updateTimeAndGreeting() {
      const now = new Date();
      const hours = now.getHours();
      const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
      const date = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Update the greeting based on the time of day
      if (hours >= 0 && hours < 12) {
        setGreeting("Good morning");
        setImage(sun);
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Good afternoon");
        setImage(sun);
      } else {
        setGreeting("Good evening");
        setImage(moon);
      }

      // Format the current time
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setCurrentTime(formattedTime);
      setCurrentDate(`${dayOfWeek}, ${date}`);
    }

    // Update time, greeting, and date initially
    updateTimeAndGreeting();

    // Update the time and greeting every minute
    const interval = setInterval(updateTimeAndGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="div-beginning"
        style={{
          width: "100%",
          height: "20vh",
        }}
      >
        <Navbar></Navbar>
      </div>
      <div
        className="chart-container"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "90%", height: "90%" }}
          className="container-of-all"
        >
          <div className="whiteContainer">
            <div className="row">
              <div className="greeting">
                <div>
                  <img
                    style={{ height: 100, width: 100, borderRadius: 100 }}
                    src={image}
                    alt="Sun/Moon"
                  ></img>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {greeting}!
                </p>
                <h1
                  style={{ textAlign: "center", fontSize: 50, color: "black" }}
                >
                  {currentTime}
                </h1>
                <p style={{ textAlign: "center", color: "black" }}>
                  {currentDate}
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
                <div style={{ width: "100%" }}>
                  <h1
                    style={{
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    TOTAL
                  </h1>
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: 100,
                      color: "#366B1B",
                    }}
                  >
                    13
                  </h1>
                  <p
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    VIOLATIONS
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    TODAY
                  </p>
                </div>
              </div>
              <div className="chartC-container">
                <div className="chartC">
                  <div
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: -40,
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
                      marginTop: -40,
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
                      <p className="title-date">Weekly</p>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "100%",
                      }}
                    >
                      <ChartD></ChartD>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
