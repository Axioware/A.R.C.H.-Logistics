import React, { useState } from 'react';
import GeneralField from '../General/GeneralField';
import GeneralButton from '../General/GeneralButton';
import PrepPrimeLogo from '../../Assets/Images/Login/PrepPrimeLogo.jpg';

const Forgotpasspage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Invalid email address. Please try again.');
    } else {
      setErrorMessage('');
      console.log('Email submitted:', email);
    }
  };

  const styles = {
    pageContainer: {
      backgroundColor: '#e0e0e0',
      backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/frontend/Assets/Images/Authentication/Forgot Password/background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      filter: 'saturate(0.8)',
    },
    formContainer: {
      display: 'flex',
      width: '900px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
    },
    logoSection: {
      backgroundColor: '#000',
      color: '#fff',
      width: '60%',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formSection: {
      width: '40%',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      fontSize: '28px',
      color: '#2c5b97',
      textDecoration: 'none',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '15px',
      color: '#333',
    },
    description: {
      fontSize: '14px',
      marginBottom: '30px',
      color: '#666',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#333',
      marginBottom: '5px',
      marginLeft: '10px',
    },
    errorMessage: {
      color: 'red',
      marginTop: '10px',
    },
    footer: {
      textAlign: 'center',
      marginTop: '30px',
      fontSize: '12px',
      color: '#555',
    },
    contactLink: {
      color: '#2c5b97',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <img
            src={PrepPrimeLogo}
            alt="PREPPRIME Logo"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>

        {/* Form Section */}
        <div style={styles.formSection}>
          {/* Back Button */}
          <a href="/login" style={styles.backButton}>
            ←
          </a>

          <h2 style={styles.heading}>Forgot Password</h2>
          <p style={styles.description}>
            Enter the email address associated with your account and we’ll send
            you an OTP to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <GeneralField
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <GeneralButton
              text="Continue"
              text_color={[255, 255, 255]}
              button_color={[44, 91, 151]}
            />
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            <p>Prepprime © Copyright 2024</p>
            <div>
              <a
                href="https://prepprime.com/contact-us-2/"
                style={styles.contactLink}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpasspage;
