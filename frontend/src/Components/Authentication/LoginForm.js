import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralField from '../General/GeneralField';
import GeneralButton from '../General/GeneralButton';
import arch from '../../Assets/Images/Login/finallogo.png';

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
      const response = await fetch(`http://${process.env.REACT_APP_TENANT_NAME}/auth/api/token/`, {
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
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        console.log(localStorage.getItem('access_token'));
        navigate('/home');
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
    setter(value.target.value);
    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      maxWidth: '900px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      margin: '5% auto', // Center container vertically and horizontally
    },
    logoContainer: {
      backgroundColor: '#000',
      color: '#fff',
      width: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoImage: {
      aspectRatio:'unlock',
      maxWidth: '60%',
      height: '60%',
    },
    loginContainer: {
      width: '40%',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    heading: {
      fontSize: '1.8rem',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
      fontWeight: 'bold',
      lineHeight: '1.5',
    },
    inputGroup: {
      marginBottom: '20px',
      width: '100%',
    },
    errorText: {
      display: 'none',
      color: '#ff4d4d',
      fontSize: '0.9rem',
      marginTop: '5px',
      textAlign: 'left',
    },
    errorMessage: {
      color: '#ff4d4d',
      backgroundColor: '#ffe6e6',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '15px',
      border: '1px solid #ff9999',
      fontSize: '1rem',
      textAlign: 'center',
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '0.9rem',
      color: '#555',
    },
    footerLink: {
      color: '#2c5b97',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center'
      // marginRight: '10%',
    },
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