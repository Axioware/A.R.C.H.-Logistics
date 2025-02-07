import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import bg from '../../Assets/Images/Login/background.jpg';
import arch from '../../Assets/Images/archlabs.jpg';

const Forgotpasspage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Invalid email address. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://asad.localhost:8000/auth/api/genotp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        localStorage.setItem('reset_email', email);
        navigate(`/otp?email=${encodeURIComponent(email)}`);
      } else if (response.status === 400) {
        setErrorMessage('Email does not exist.');
      } else {
        setErrorMessage('Server error. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <img src={arch} alt="ARCH Logo" style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
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
          <a
            onClick={() => navigate('/login')}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontSize: '28px',
              color: '#1e1e1e',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ←
          </a>
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333', fontWeight: 'bold', marginLeft: '12%' }}>
            Forgot Password
          </h2>
          <p style={{ fontSize: '14px', marginBottom: '30px', color: '#666' }}>
            Enter the email address associated with your account.
          </p>
          <form onSubmit={handleFormSubmit}>
            <GeneralField
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              func={setEmail}
              width="100%"
              disabled={isSubmitting} // Disable input during submission
              hint="johnsmith@example.com"
              style={{ cursor: isSubmitting ? 'not-allowed' : 'text' }}
            />
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
            <GeneralButton
              text={isSubmitting ? 'Submitting...' : 'Send OTP'}
              width="100%"
              height="40px"
              func={handleFormSubmit}
              border="8px"
              disabled={isSubmitting} // Disable button during submission
              id="loginbtn"
              style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            />
          </form>
          <div style={{ textAlign: 'center', marginTop: '18%' }}>
            <p style={{ fontSize: '12px', color: '#555' }}>A.R.C.H. Labs © Copyright 2025</p>
            <div>
              <a href="https://prepprime.com/contact-us-2/" style={{ color: '#2c5b97', textDecoration: 'none', fontSize: '12px' }}>
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