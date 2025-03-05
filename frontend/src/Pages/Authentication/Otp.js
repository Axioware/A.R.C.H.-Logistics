import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpForm from "../../Components/Authentication/Otpform"; // Adjust the path if necessary
// import PrepPrimeLogo from "../../Assets/Images/Login/PrepPrimeLogo.jpg";
import BackgroundImage from "../../Assets/Images/Login/background.jpg";
import arch from '../../Assets/Images/Login/finallogo.png';

const Otp = () => {
  const [email] = useState("user@example.com"); // Replace with dynamic email if needed
  const navigate = useNavigate();

  const handleOtpSubmit = (otp) => {
    // Add your OTP verification logic
    console.log("Submitted OTP:", otp);
    // Navigate to success page on successful OTP verification
    navigate("/success");
  };

  return (
    <>
      {/* Include font-face styles */}
      <style>
        {`
          @font-face {
            font-family: 'Konkhmer Sleokchher';
            src: url('../../Assets/Fonts/Konkhmer Sleokchher.ttf') format('truetype');
          }
          body {
            font-family: 'Konkhmer Sleokchher', sans-serif;
            margin: 0;
            padding: 0;
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#e0e0e0",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "70%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              width: "100%", // Adjusted width for balance
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={arch}
              alt="ARCH Logo"
              style={{ maxWidth: "60%", height: "auto", marginBottom: "20px" }}
            />
           
          </div>
          <OtpForm
            email={email}
            onSubmit={handleOtpSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Otp;
