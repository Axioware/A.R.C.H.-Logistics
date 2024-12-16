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
    const a = document.getElementById("loginbutton");
a.disabled = true;
a.style.backgroundColor="grey";


    // Reset previous errors
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    // Input validation
    if (!username.trim()) {
      usernameError.style.display = 'block';
      return;
    }
    if (!password.trim()) {
      passwordError.style.display = 'block';
      return;
    }

    // Clear any previous error message
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Simulated API call
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Success (status 200)
        navigate('/dashboard'); // Redirect to dashboard
      } else if (response.status === 400) {
        setErrorMessage('Validation error. Please check your input.');
      } else if (response.status >= 500 && response.status < 600) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
      a.disabled = false
      a.style.backgroundColor="#2C5B97"
    }
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setIsSubmitting(false); // Reset the button's disabled state on input change
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
      maxWidth: '80%',
      height: 'auto',
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
          src={PrepPrimeLogo}
          alt="PREPPRIME Logo"
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
              type="password"
              id="password"
              placeholder="Password"
              hint="Enter Password"
              value={password}
              func={handleInputChange(setPassword)}
            />
            <span id="passwordError" style={styles.errorText}>
              Please enter a password.
            </span>
          </div>
          {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          <div style={styles.buttonContainer}>
            <GeneralButton
              text="Login"
              id="loginbutton"
              text_color={[255, 255, 255]}
              button_color={[44, 91, 151]}
              width="30%"
              disabled={isSubmitting}
              func={handleLogin}
              height="30px"
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
  );
};

export default LoginForm;
