import React from "react";
import GeneralField from '../General/GeneralField';
import GeneralButton from '../General/GeneralButton';

const ResetPasswordForm = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      backgroundColor: "#e0e0e0", 
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/frontend/Assets/Images/Authentication/Login/background.jpg')", 
      backgroundSize: "cover", 
      filter: "saturate(0.8)" 
    }}>
      <div style={{ 
        display: "flex", 
        width: "900px", 
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        borderRadius: "10px", 
        overflow: "hidden"
      }}>
        <div style={{ 
          backgroundColor: "#000", 
          color: "#fff", 
          width: "60%", 
          padding: "20px", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center"
        }}>
          <img 
            src="/frontend/Assets/Images/Authentication/Forgot Password/Prep Prime Logo.jpg" 
            alt="PREPPRIME Logo" 
            style={{ maxWidth: "80%", height: "auto" }} 
          />
        </div>
        <div style={{ 
          width: "40%", 
          padding: "40px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center"
        }}>
          <a href="/frontend/Templates/Authentication/ForgotPassword.html" style={{ 
            position: "absolute", 
            top: "10px", 
            left: "10px", 
            fontSize: "28px", 
            color: "#2c5b97", 
            textDecoration: "none" 
          }}>←</a>
          <h2 style={{ 
            fontSize: "28px", 
            marginBottom: "15px", 
            color: "#333" 
          }}>Reset Password</h2>
          <form method="POST">
            <div style={{ marginBottom: "20px" }}>
              <GeneralField
                type="password"
                id="password"
                placeholder="New Password"
                label="New Password"
                name="newPassword"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <GeneralField
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                name="confirmPassword"
              />
            </div>
            <p id="red"></p>
            <GeneralButton label="Reset" className="login-btn" style={{ 
              width: "100%", 
              maxWidth: "400px", 
              padding: "15px", 
              backgroundColor: "#2c5b97", 
              color: "white", 
              border: "none", 
              borderRadius: "10px", 
              fontSize: "16px", 
              cursor: "pointer" 
            }} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
