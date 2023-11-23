import OneSignal from "onesignal";

export const initOneSignal = () => {
  OneSignal.init({
    appId: "9880c609-f8ba-469b-93ba-ea4d45b3b474", // Replace with your OneSignal App ID
    promptOptions: {},
    path: "/citisafeweb/", // Include the full path here
  });
};
