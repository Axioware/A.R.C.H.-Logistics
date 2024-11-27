import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router to handle navigation
import LoginForm from '../../Components/Authentication/LoginForm'; // Assuming LoginButton.js is in the same folder

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
    <div className="container">
      <LoginForm />
    </div>
  );
};

export default Login;
