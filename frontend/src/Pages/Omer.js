import React from "react";
import SessionExpired from "../Components/General/SessionExpired";
import exclan from "../Assets/Images/exclamation-mark.png"

const handleButtonClick = () => {
  console.log("Button Clicked! Closing modal...");
};

const icon = exclan

const Omer = () => {
  return (
    <SessionExpired
      icon={icon}
      heading_text="Session Expired"
      heading_text_color={[255, 255, 255]}
      heading_background={[42,77,107]}
      body_text={`Your session has expired.\nPlease log in again.`}
      body_text_color={[50, 50, 50]}
      background_color={[255, 255, 255]}
      click_outside={true}
      button_text="Redirect to Login"
      button_color={[42,77,107]}
      button_hover_color={[0, 100, 200]}
      button_width="150px"
      button_height="50px"
      button_function={handleButtonClick}
      width="450px"
      height="330px"
    />
  );
};

export default Omer;
