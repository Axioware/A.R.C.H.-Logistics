import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router to handle navigation
import LoginForm from '../../Components/Authentication/LoginForm'; // Assuming LoginButton.js is in the same folder
import backgroundImage from '../../Assets/Images/Login/background.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable fields and button during submission
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate input fields
    if (username === '' || password === '') {
      setErrorMessage('Both fields are required.');
      return;
    }

    // Disable form fields and button during submission
    setIsSubmitting(true);
    setErrorMessage('');

    // Make an API call (simulated with a timeout for this example)
    try {
      const response = await fetch('/api/login', { // Replace with your actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Successful login
        navigate('/Dashboard'); // Redirect to the Dashboard page
      } else if (response.status === 400) {
        // Validation error
        setErrorMessage('Validation error. Please check your credentials.');
      } else if (response.status >= 500 && response.status < 600) {
        // Server error
        setErrorMessage('Server error. Please try again.');
      }
    } catch (error) {
      // Network or unexpected error
      setErrorMessage('An error occurred. Please try again later.');
    }

    // Re-enable the button and fields after the response
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex', // Use Flexbox
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background image with color overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1, // Ensure it's behind the content
        }}
      >
        {/* Semi-transparent overlay to dim the background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black overlay
            zIndex: -1, // Ensure it overlays the background image
          }}
        />
      </div>

      {/* Container for LoginForm */}
      <div
        className="container"
        style={{
          background: 'white', // Optional background for the container
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)', // Optional shadow for visual effect
          borderRadius: '8px', // Optional rounded corners
          width: '60%', // Increased width (adjust as needed)
          height: '80%', // Increased height (adjust as needed)
        
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
