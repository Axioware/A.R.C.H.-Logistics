import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralField from '../General/GeneralField';
import GeneralButton from '../General/GeneralButton';
import PrepPrimeLogo from '../../Assets/Images/Login/PrepPrimeLogo.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    if (!username) {
      usernameError.style.display = 'block';
      return;
    }
    if (!password) {
      passwordError.style.display = 'block';
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else if (response.status === 400) {
        setErrorMessage('Validation error. Please check your input.');
      } else if (response.status >= 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } catch {
      setErrorMessage('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const styles = {
    container: {
      display: 'flex',
      width: '90%',
      maxWidth: '800px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      margin: '5vh auto',
      fontFamily: 'Konkhmer Sleokchher, sans-serif',
    },
    logoContainer: {
      backgroundColor: '#000',
      color: '#fff',
      flex: '1',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginContainer: {
      flex: '1',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      fontSize: 'clamp(1.5rem, 2.5vw, 2.3rem)',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
    },
    inputGroup: { marginBottom: '15px' },
    errorText: {
      display: 'none',
      color: '#ff4d4d',
      fontSize: '0.9rem',
      marginTop: '5px',
    },
    footer: {
      marginTop: '20px',
      fontSize: '0.85rem',
      color: '#555',
      textAlign: 'center',
    },
    footerLink: {
      color: '#2c5b97',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  };

  return (
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
              func={setUsername}
              width="100%"
            />
            <span id="usernameError" style={styles.errorText}>
              Please enter a username.
            </span>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <GeneralField
              type="password"
              id="password"
              placeholder="Password"
              hint="Enter Password"
              value={password}
              func={setPassword}
              width="100%"
            />
            <span id="passwordError" style={styles.errorText}>
              Please enter a password.
            </span>
          </div>
          {errorMessage && <div style={styles.errorText}>{errorMessage}</div>}
          <GeneralButton
            text="Login"
            text_color={[255, 255, 255]}
            button_color={[44, 91, 151]}
            width="100%"
            disabled={isSubmitting}
            func={handleLogin}
          />
        </form>
        <div style={styles.footer}>
          <p>
            Forgot your password?{' '}
            <span style={styles.footerLink} onClick={handleForgotPassword}>
              Click here
            </span>
          </p>
          <p>Prepprime © Copyright 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
