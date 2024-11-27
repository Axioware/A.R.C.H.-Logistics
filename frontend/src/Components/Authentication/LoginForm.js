import React, { useState } from 'react';
import GeneralField from '../General/GeneralField'

// Reusable Comp1 Component (Input Field)
const a = ({ type, id, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="comp1-input"
    />
  );
};

// Reusable LoginButton Component (Submit Button)
const LoginButton = ({ text, text_color, button_color }) => {
  const buttonStyle = {
    backgroundColor: `rgb(${button_color.join(',')})`,
    color: `rgb(${text_color.join(',')})`,
  };

  return (
    <button type="submit" className="login-btn" style={buttonStyle}>
      {text}
    </button>
  );
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setErrorMessage('Both fields are required.');
    } else {
      setErrorMessage('');
      console.log('Form submitted:', { username, password });
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
      <img src="/Images/login/PrepPrimeLogo.jpg" alt="Logo" />
      </div>
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <p></p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <GeneralField
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <GeneralField
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p id="red" className="error-message">
              {errorMessage}
            </p>
          )}
          <LoginButton text="Login" text_color={[255, 255, 255]} button_color={[0, 123, 255]} />
        </form>

        <div className="footer">
          <p>
            Forgot your password? <a href="ForgotPassword.html">Click here</a>
          </p>
          <p>Prepprime © Copyright 2024</p>
          <div className="terms">
            <a href="https://prepprime.com/contact-us-2/">Contact Us</a>
          </div>
        </div>
      </div>

      <style>
        {`
          /* Import the font */
          @font-face {
            font-family: 'Konkhmer Sleokchher';
            src: url('Konkhmer Sleokchher.ttf') format('truetype');
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }

          body {
            background-color: #e0e0e0;
            background-image: linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),
                        url(/Images/login/Background.jpg);
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            filter: saturate(0.8); /* Low saturation */
          }

          .container {
            display: flex;
            width: 900px;
            background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
          }

          .logo-container {
            background-color: #000;
            color: #fff;
            width: 60%; /* 60% of the width */
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .logo-container img {
            max-width: 80%;
            height: auto;
          }

          .login-container {
            width: 40%; /* 40% of the width */
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          h2 {
            font-size: 28px;
            margin-bottom: 15px;
            color: #333;
            text-align: center;
          }

          p {
            font-size: 14px;
            margin-bottom: 30px;
            color: #666;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .input-group label {
            display: block;
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
          }

          .input-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 10px;
            font-size: 14px;
          }

          .login-btn {
            width: 100%;
            padding: 15px;
            background-color: #2c5b97;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
          }

          .login-btn:hover {
            background-color: #204773;
          }

          .terms {
            text-align: center;
            margin-top: 10px;
            font-size: 12px;
          }

          .terms a {
            color: #2c5b97;
            text-decoration: none;
            font-size: 12px;
          }

          .terms a:hover {
            text-decoration: underline;
          }

          .signup {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
          }

          .signup a {
            color: #2c5b97;
            text-decoration: none;
          }

          .signup a:hover {
            text-decoration: underline;
          }

          /* Footer Section */
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #555;
          }

          .footer p {
            margin-bottom: 5px;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .container {
              flex-direction: column;
            }

            .logo-container {
              width: 100%; /* Full width on mobile */
              padding: 10px;
            }

            .login-container {
              width: 100%; /* Full width on mobile */
              padding: 20px;
            }

            .login-btn {
              padding: 10px;
              font-size: 14px;
            }

            .signup {
              font-size: 12px;
            }

            .error-message {
              color: #ff4d4d; /* Bright red for visibility */
              background-color: #ffe6e6; /* Light red background */
              padding: 10px; /* Add some space around the text */
              border-radius: 5px; /* Rounded corners */
              margin-bottom: 15px; /* Space below the message */
              border: 1px solid #ff9999; /* Soft red border */
              font-size: 14px; /* Slightly larger text */
              text-align: center; /* Center align the message */
              display: block;
            }

            .footer {
              font-size: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;

