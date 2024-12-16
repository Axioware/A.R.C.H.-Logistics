import React, { useState, useEffect } from "react";
import GeneralField from "../General/GeneralField";
import GeneralButton from "../General/GeneralButton";

const OtpForm = ({ email, onSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responsiveStyles, setResponsiveStyles] = useState({});

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
      } else if (window.innerWidth <= 1024) {
        setResponsiveStyles({
          otpContainer: { width: "75%", padding: "50px" },
          heading: { fontSize: "1.75rem" },
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
    if (isNaN(value)) return; // Ensure only numbers are entered
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically move to the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 2}`).focus();
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
      const response = await simulateApiCall(otpValue);

      if (response.status === 200) {
        localStorage.setItem("token", response.token); // Save token to localStorage
        onSubmit(); // Redirect to reset-password page
      } else if (response.status === 400) {
        setError("Invalid OTP");
      } else if (response.status >= 500) {
        setError("Server error. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const simulateApiCall = (otpValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otpValue === "12345") {
          resolve({ status: 200, token: "mock-token-123" });
        } else if (otpValue === "00000") {
          resolve({ status: 400 });
        } else {
          resolve({ status: 500 });
        }
      }, 1000);
    });
  };

  const styles = {
    otpContainer: {
      width: "65%",
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      margin: "0 auto",
      ...responsiveStyles.otpContainer,
    },
    backArrow: {
      position: "absolute",
      top: "10px",
      left: "10px",
      fontSize: "1.75rem",
      color: "#2c5b97",
      textDecoration: "none",
    },
    heading: {
      fontSize: "1.75rem",
      marginBottom: "15px",
      color: "#333",
      marginLeft: "30px",
      fontWeight: "bold",
      ...responsiveStyles.heading,
    },
    paragraph: {
      fontSize: "0.875rem",
      marginBottom: "30px",
      color: "#666",
      textAlign: "center",
    },
    otpInputGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    otpInput: {
      width: "50px",
      height: "50px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      fontSize: "24px",
      textAlign: "center",
      ...responsiveStyles.otpInput,
    },
    otpButton: {
      width: "20%",
      padding: "15px",
      backgroundColor: "#2c5b97",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1rem",
      cursor: "pointer",
      display: "block",
      marginLeft: "20px",
      ...responsiveStyles.otpButton,
    },
    errorMessage: {
      color: "red",
      marginTop: "5px",
      textAlign: "left",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      fontSize: "0.875rem",
      color: "#555",
    },
    terms: {
      textAlign: "center",
      marginTop: "10px",
      fontSize: "0.75rem",
    },
    link: {
      color: "#2c5b97",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.otpContainer}>
      <a href="/forgot-password" style={styles.backArrow}>
        ←
      </a>
      <h2 style={styles.heading}>OTP Verification</h2>
      <p style={styles.paragraph}>
        Enter the OTP code sent to <br />
        {email}
      </p>
      <form onSubmit={handleSubmit}>
        <div style={styles.otpInputGroup}>
          {otp.map((digit, index) => (
            <GeneralField
              key={index}
              id={`otp-${index + 1}`}
              type="text"
              value={digit}
              maxLength={1}
              width="80%"
              func={(value) => handleChange(index, value)} // Pass the function with the current index
              style={styles.otpInput}
              disabled={isSubmitting} // Disable fields during submission
            />
          ))}
        </div>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <GeneralButton
          type="submit"
          text={isSubmitting ? "Processing..." : "Verify & Proceed"}
          width="100%"
          style={styles.otpButton}
          disabled={isSubmitting} // Disable button during submission
        />
      </form>
      <div style={styles.footer}>
        <p>Prepprime © Copyright 2024</p>0
        <div style={styles.terms}>
          <a href="https://prepprime.com/contact-us-2/" style={styles.link}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
