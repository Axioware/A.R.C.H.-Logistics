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
        localStorage.setItem('refreshToken', data.refresh);
        alert('Login successful');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '900px', backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden', fontFamily: 'Arial, sans-serif', margin: '5% auto' }}>
      <div style={{ backgroundColor: '#000', color: '#fff', width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={arch} alt="ARCH Logo" style={{ maxWidth: '80%', height: 'auto' }} />
      </div>
      <div style={{ width: '40%', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold', lineHeight: '1.5' }}>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <label htmlFor="username">Username:</label>
            <GeneralField type="text" id="username" placeholder="Username" hint="Enter Username" value={username} func={handleInputChange(setUsername)} width="100%" />
          </div>
          <div style={{ marginBottom: '20px', width: '100%', position: 'relative' }}>
            <label htmlFor="password">Password:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GeneralField field_type={showPassword ? "text" : "password"} id="password" placeholder="Password" hint="Enter Password" value={password} func={handleInputChange(setPassword)} />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>
                
              </span>
            </div>
          </div>
          {errorMessage && <div style={{ color: '#ff4d4d', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #ff9999', fontSize: '1rem', textAlign: 'center' }}>{errorMessage}</div>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GeneralButton text="Login" id="loginbutton" width="100%" func={handleLogin} height="40px" border="8px" disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
