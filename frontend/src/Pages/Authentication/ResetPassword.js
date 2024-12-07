import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import PrepPrimeLogo from '../../Assets/Images/Login/PrepPrimeLogo.jpg';
import BackgroundImage from '../../Assets/Images/Login/background.jpg';

const ResetPassword = () => {
    const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!formData.newPassword || !formData.confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Disable fields and button
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            // Sample API call
            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: formData.newPassword }),
            });

            if (response.status === 200) {
                localStorage.setItem("token", null);
                navigate("/login");
            } else if (response.status === 400) {
                setErrorMessage("Please choose a different password.");
            } else if (response.status >= 500) {
                setErrorMessage("Server error. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Add font-face styles */}
            <style>
                {`
                    @font-face {
                        font-family: 'Konkhmer Sleokchher';
                        src: url('../../Assets/Fonts/Konkhmer Sleokchher.ttf') format('truetype');
                    }
                    body {
                        font-family: 'Konkhmer Sleokchher', sans-serif;
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
                    filter: "saturate(0.8)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "900px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#000",
                            color: "#fff",
                            width: "60%",
                            padding: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={PrepPrimeLogo}
                            alt="PREPPRIME Logo"
                            style={{ maxWidth: "80%", height: "auto" }}
                        />
                    </div>
                    <div
                        style={{
                            width: "40%",
                            padding: "40px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            fontFamily: "Konkhmer Sleokchher, sans-serif", // Apply the font
                        }}
                    >
                        <a
                            href="/frontend/Templates/Authentication/ForgotPassword.html"
                            style={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                fontSize: "28px",
                                color: "#2c5b97",
                                textDecoration: "none",
                                fontFamily: "Konkhmer Sleokchher, sans-serif", // Apply the font
                            }}
                        >
                            ←
                        </a>
                        <h2
                            style={{
                                fontSize: "28px",
                                marginBottom: "16%",
                                color: "#333",
                                marginLeft: "11%",
                                fontWeight: "bold",
                                wordSpacing: "1px",
                                fontFamily: "Konkhmer Sleokchher, sans-serif", // Apply the font
                            }}
                        >
                            Reset Password
                        </h2>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "20px", fontWeight: "lighter",fontSize: "14px", color: "#333", }}>
                                <GeneralField
                                    hint={"New Password"}
                                    type="password"
                                    id="password"
                                    placeholder="New Password"
                                    label="New Password"
                                    name="newPassword"
                                    onChange={handleInputChange}
                                    value={formData.newPassword}
                                    width={"98%"}
                                />
                            </div>
                            <div style={{ marginBottom: "20px", fontWeight: "Normal", fontSize: "14px", color: "#333", }}>
                                <GeneralField
                                    hint={"Confirm Password"}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    onChange={handleInputChange}
                                    value={formData.confirmPassword}
                                    
                                    
                                />
                            </div>
                            <p style={{ color: "red" }}>{errorMessage}</p>
                            <GeneralButton
                                label="Reset"
                                className="login-btn"
                                text="Reset"
                                width="95%"
                                isSubmitting={isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
