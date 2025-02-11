import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralField from '../General/GeneralField';
import GeneralButton from '../General/GeneralButton';
import arch from '../../Assets/Images/archlabs.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
  
    const loginButton = document.getElementById("loginbutton");
    loginButton.disabled = true;
    loginButton.style.backgroundColor = "grey";
  
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      setIsSubmitting(false);
      loginButton.disabled = false;
      loginButton.style.backgroundColor = "#1e1e1e";
      return;
    }
  
    try {
      const response = await fetch('http://asad.localhost:8000/auth/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 401) {
        setErrorMessage("Invalid credentials");
      } else if (response.status === 500) {
        setErrorMessage("Failed to connect to the server. Please try again.");
      } else if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.detail || "An error occurred. Please try again.");
      } else {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        // localStorage.setItem('refreshToken', data.refresh);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
      loginButton.disabled = false;
      loginButton.style.backgroundColor = "#1e1e1e";
    }
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  
  const styles = {
    mainContent: {
      padding: "10px 0px 50px 0px",
      backgroundColor: "#f7f6f6"
    },
    form: {
      position: "relative",
      alignSelf: "flex-start",
      display: "grid",
      gridTemplateColumns: "1fr 1fr", // Two columns
      gap: "35px",
      marginLeft: "20px",
      marginRight: "30px",
      marginTop: "35px"
    },
    buttonContainer: {
      alignSelf: "flex-end",
      display: "flex",
      flexDirection: "row",
      width: "250px",
      gap: "20px",
      marginTop: "20px",
      lineHeight: "40px"
    },
    headingContainer: {
      alignSelf: "flex-start",
      marginLeft: "20px",
      marginTop: "15px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img
          src={arch}
          alt="ARCH Logo"
          style={styles.logoImage}
        />
      </div>
      <div style={styles.loginContainer}>
        <h2 style={styles.heading}>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <GeneralField
              type="text"
              id="username"
              placeholder="Username"
              hint="Enter Username"
              value={username}
              func={handleInputChange(setUsername)}
              width="100%"
            />
            <span id="usernameError" style={styles.errorText}>
              Please enter a username.
            </span>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <GeneralField
              field_type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Password" 
              hint="Enter Password" 
              value={password} 
              func={handleInputChange(setPassword)}
            />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>
            </span>
          </div>
          {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          <div style={styles.buttonContainer}>
            <GeneralButton
              text="Login"
              id="loginbutton"
              width="100%"
              func={handleLogin}
              height="40px"
              border = '8px'
            />
          </div>
        </form>
        <div style={styles.footer}>
          <p>
            Forgot your password?{' '}
            <span style={styles.footerLink} onClick={handleForgotPassword}>
              Click here
            </span>
          </p>
          <p>A.R.C.H. Labs © Copyright 2025</p>
          <div>
            <a
              href="https://prepprime.com/contact-us-2/"
              style={styles.footerLink}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
