import React, { useState } from 'react';
import GeneralField from '../General/GeneralField';
import GeneralButton from '../General/GeneralButton';
import PrepPrimeLogo from '../../Assets/Images/Login/PrepPrimeLogo.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
    } else {
      setErrorMessage('');
      console.log('Logging in with:', { username, password });
      // Redirect logic or API call goes here
      window.location.href = '/dashboard';
    }
  };

  const styles = {
    container: {
      display: 'flex',
      width: '900px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      fontFamily: 'Konkhmer Sleokchher, sans-serif',
      height: "78%",
    },
    logoContainer: {
      backgroundColor: '#000',
      color: '#fff',
      width: '60%',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginContainer: {
      width: '40%',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    heading: {
      fontSize: '28px',
      // marginTop: '10px',
      marginBottom: '80px',
      color: '#333',
      textAlign: 'center',
      fontWeight: 'bolder',
      lineHeight: "120%"
    },
    inputGroup: { marginBottom: '20px', width: "100%", fontWeight: "lighter", fontSize: "14px", color: "#333", },
    errorMessage: {
      color: '#ff4d4d',
      backgroundColor: '#ffe6e6',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '15px',
      border: '1px solid #ff9999',
      fontSize: '14px',
      textAlign: 'center',
    },
    footer: {
      textAlign: 'center',
      marginTop: '30px',
      fontSize: '12px',
      color: "#555",
    },
    
    footerLink: {
      color: '#2c5b97',
      textDecoration: 'none',
    },
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
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img
            src={PrepPrimeLogo}
            alt="PREPPRIME Logo"
            style={{ maxWidth: '80%', height: 'auto' }}
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
                onChange={(e) => setUsername(e.target.value)}
              
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password">Password:</label>
              <GeneralField
                type="password"
                id="password"
                hint="Enter Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width={'94%'}
                height={'20%'}
              />
            </div>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
            <GeneralButton
              text="Login"
              text_color={[255, 255, 255]}
              button_color={[44, 91, 151]}
              width="94%"
            />
          </form>
          <div style={styles.footer}>
            <p>
              Forgot your password?{' '}
              <a href="/forgot-password" style={styles.footerLink}>
                Click here
              </a>
            </p>
            <p>Prepprime © Copyright 2024</p>
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
    </>
  );
};

export default LoginForm;
