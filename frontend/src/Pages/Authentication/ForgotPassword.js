import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forgotpasspage from '../../Components/Authentication/Forgotpasspage';
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import PrepPrimeLogo from '../../Assets/Images/Login/PrepPrimeLogo.jpg';
import bg from '../../Assets/Images/Login/background.jpg';

const Forgotpassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Simple validation logic
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage('Invalid email address. Please try again.');
      } else {
        setErrorMessage('');
        console.log('Email submitted:', email);
        // Add API call logic here
      }
    };

    return (
        <div
          style={{
            backgroundColor: '#e0e0e0',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            filter: 'saturate(0.8)',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '900px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Logo Section */}
            <div
              style={{
                backgroundColor: '#000',
                color: '#fff',
                width: '60%',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={PrepPrimeLogo}
                alt="PREPPRIME Logo"
                style={{ maxWidth: '80%', height: 'auto' }}
              />
            </div>
    
            {/* Form Section */}
            <div
              style={{
                width: '40%',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Back Button */}
              <a
                href="/login"
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontSize: '28px',
                  color: '#2c5b97',
                  textDecoration: 'none',
                }}
              >
                ←
              </a>
    
              <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333' }}>
                Forgot Password
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  marginBottom: '30px',
                  color: '#666',
                }}
              >
                Enter the email address associated with your account and we’ll send
                you an OTP to reset your password.
              </p>
    
              {/* Form */}
              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#333',
                      marginBottom: '5px',
                      marginLeft: '10px',
                    }}
                  >
                    Email
                  </label>
                  <GeneralField
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    width={"94%"}
                   
                  />
                </div>
                {errorMessage && (
                  <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                )}
                <GeneralButton
                  text="Continue"
                  text_color={[255, 255, 255]}
                  button_color={[44, 91, 151]}
                   width="94%"
  height="50%"
                />
              </form>
    
              {/* Footer */}
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <p style={{ fontSize: '12px', color: '#555' }}>
                  Prepprime © Copyright 2024
                </p>
                <div>
                  <a
                    href="https://prepprime.com/contact-us-2/"
                    style={{
                      color: '#2c5b97',
                      textDecoration: 'none',
                      fontSize: '12px',
                    }}
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


export default Forgotpassword;
