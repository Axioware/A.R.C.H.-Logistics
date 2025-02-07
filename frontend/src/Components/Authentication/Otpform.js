import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeneralField from "../General/GeneralField";
import GeneralButton from "../General/GeneralButton";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [responsiveStyles, setResponsiveStyles] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("reset_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/forgot-password");
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setResponsiveStyles({
          otpContainer: { width: "95%", padding: "20px" },
          heading: { fontSize: "1.2rem" },
          otpInput: { width: "35px", height: "35px", fontSize: "16px" },
          otpButton: { width: "100%", padding: "10px", fontSize: "0.9rem" },
        });
      } else if (window.innerWidth <= 768) {
        setResponsiveStyles({
          otpContainer: { width: "85%", padding: "40px" },
          heading: { fontSize: "1.5rem" },
          otpInput: { width: "40px", height: "40px", fontSize: "20px" },
          otpButton: { width: "50%", fontSize: "0.95rem" },
        });
      } else {
        setResponsiveStyles({ otpContainer: {}, heading: {}, otpInput: {}, otpButton: {} });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric input
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input box if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 2}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to the previous input box on backspace
      document.getElementById(`otp-${index}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 5) {
      setError("Please enter a valid 5-digit OTP.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://asad.localhost:8000/auth/api/verotp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("reset_email");
        localStorage.setItem("token", data.access_token);
        navigate("/reset-password");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = `
    .field-input {
      text-align: center;
    }
    .otpContainer {
      width: 50%;
      padding: 60px;
      display: flex;
      flexDirection: column;
      justifyContent: center;
      position: relative;
      textAlign: center;
      ...responsiveStyles.otpContainer;
      lineHeight: 50px;
    }
    backArrow: {
      position: "absolute";
      top: "10px";
      left: "10px";
      fontSize: "1.75rem";
      color: "#2c5b97";
      textDecoration: "none";
    }
    heading: {
      fontSize: "1.75rem";
      marginBottom: "15px";
      position: "relative";
      color: "#333";
      fontWeight: "bold";
     
    }
    paragraph: {
      fontSize: "0.875rem";
      marginBottom: "30px";
      color: "#666";
      textAlign: "center";
    }
    otpInputGroup: {
      display: flex;
      justifyContent: "center";
      gap: "10px";
      textAlign:"center";
    }
    otpInput: {
      width: "50px";
      height: "50px";
      border: "1px solid #ccc";
      borderRadius: "10px";
      fontSize: "24px";
      textAlign: "center";
      ...responsiveStyles.otpInput;
    }
    otpButton: {
      width: "50%";
      padding: "15px";
      backgroundColor: "#2c5b97";
      color: "white";
      border: "none";
      borderRadius: "10px";
      fontSize: "1rem";
      cursor: "pointer";
      marginTop: "20px";
      ...responsiveStyles.otpButton;
    }
    errorMessage: {
      color: "red";
      marginTop: "5px";
      textAlign: "left";
    }
    footer: {
      textAlign: "center";
      marginTop: "30px";
      fontSize: "0.875rem";
      color: "#555";
    }
    terms: {
      textAlign: "center";
      marginTop: "10px";
      fontSize: "0.75rem";
    }
    link: {
      color: "#2c5b97";
      textDecoration: "none";
    }
  `;

  return (
    <>
    <style>{styles}</style>
    <div className={"otpContainer"} >
      <a href="/forgot-password" className={"backArrow"}>
        ←
      </a>
      <h2 className={"heading"}>OTP Verification</h2>
      <p className={"paragraph"}>
        Enter the OTP code sent to <br />
        <b>{email}</b>
      </p>
      <form onSubmit={handleSubmit}>
        <div className={"otpInputGroup field-input"}>
          {otp.map((digit, index) => (
            <GeneralField
              key={index}
              id={`otp-${index + 1}`}
              type="text"
              value={digit}
              maxLength={1}
              width="50px"
              height="50px"
              func={(value) => handleChange(index, value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isSubmitting}
              className={{ ..."otpInput", textAlign: "center" }} // Center the input text
            />
          ))}
        </div>
        {error && <div className={"errorMessage"}>{error}</div>}
        <GeneralButton
          type="submit"
          text={isSubmitting ? "Processing..." : "Verify & Proceed"}
          width="100%"
          className={"otpButton"}
          disabled={isSubmitting}
        />
      </form>
      <div className={"footer"}>
        <p>Prepprime © Copyright 2024</p>
        <div className={"terms"}>
          <a href="https://prepprime.com/contact-us-2/" className={"link"}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default OtpForm;