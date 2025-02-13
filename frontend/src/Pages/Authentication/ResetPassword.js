import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import BackgroundImage from '../../Assets/Images/Login/background.jpg';
import arch from '../../Assets/Images/ARCH_Labs Logo white.png';

const ResetPassword = () => {
    const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Function to update state from GeneralField
    const handleInputChange = (field, value) => {
        console.log(`Updating ${field} with value:`+ value); // Debug log
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        console.log("Form Data Updated:", formData); // Debugging state updates
    }, [formData]);

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

        const btn = document.getElementById('resetbtn');
        btn.style.backgroundColor = 'grey';
        btn.disabled = true;

        // Disable fields and button
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const accessToken = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");
            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("Form Data:", formData);
            const response = await fetch(`http://${process.env.REACT_APP_TENANT_NAME}/auth/api/reset-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    password: formData.newPassword, 
                    refresh_token: refreshToken
                }),
            });

            if (response.status === 200) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
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
            btn.style.backgroundColor = '#1e1e1e';
            btn.disabled = false;
        }
    };

    return (
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
                        src={arch}
                        alt="ARCH Logo"
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
                    }}
                >
                    <h2
                        style={{
                            fontSize: "28px",
                            marginBottom: "16%",
                            color: "#333",
                            marginLeft: "11%",
                            fontWeight: "bold",
                            wordSpacing: "1px",
                        }}
                    >
                        Reset Password
                    </h2>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "20px", fontSize: "14px", color: "#333" }}>
                            <GeneralField
                                label="New Password"
                                field_type="password"
                                name="newPassword"
                                id="newPassword"
                                hint="Enter new password"
                                func={(value) => handleInputChange("newPassword", value)}
                                value={formData.newPassword}
                                required={true}
                                width="100%"
                                maxLength={50}
                            />
                        </div>
                        <div style={{ marginBottom: "20px", fontSize: "14px", color: "#333" }}>
                            <GeneralField
                                label="Confirm Password"
                                field_type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                hint="Re-enter new password"
                                func={(value) => handleInputChange("confirmPassword", value)}
                                value={formData.confirmPassword}
                                required={true}
                                width="100%"
                                maxLength={50}
                            />
                        </div>
                        <p style={{ color: "red" }}>{errorMessage}</p>
                        <GeneralButton
                            label="Reset"
                            id="resetbtn"
                            text="Reset"
                            width="100%"
                            height="40px"
                            border="8px"
                            func={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
