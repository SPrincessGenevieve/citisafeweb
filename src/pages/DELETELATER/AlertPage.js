import React, { useEffect } from "react";
import Navbar from "../../Navbar";
import { Button } from "@mui/material";

window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;

function AlertPage(props) {
  useEffect(() => {
    const initOneSignal = async () => {
      try {
        await OneSignal.init({
          appId: "7fab2e64-49c1-4037-950a-9934a6072ec7",
          allowLocalhostAsSecureOrigin: true,
        });
        console.log("OneSignal initialized successfully");
      } catch (error) {
        console.error("Error initializing OneSignal:", error);
      }
    };

    initOneSignal();
  }, []); // Run the initialization code only once when the component mounts

  const handleNotifyClick = () => {
    console.log("Clicked notify button");
    OneSignal.push(() => {
      console.log("Triggering OneSignal prompt");
      OneSignal.showSlidedownPrompt();
    });
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "pink",
          width: "90%",
          height: "90%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleNotifyClick}>NOTIFY OTHER USERS</Button>
      </div>
    </div>
  );
}

export default AlertPage;
