import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import PrepPrimeLogo from '../../Assets/Images/Login/PrepPrimeLogo.jpg';
import bg from '../../Assets/Images/Login/background.jpg';

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
      const response = await fetch('https://example.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        localStorage.setItem('otp', 'true');
        navigate(`/otp&email=${encodeURIComponent(email)}`);
      } else if (response.status === 400) {
        setErrorMessage('Email does not exist.');
      } else if (response.status >= 500) {
        setErrorMessage('Server error. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'Konkhmer Sleokchher';
            src: url('../../Assets/Fonts/Konkhmer Sleokchher.ttf') format('truetype');
          }
          body, div, p, a, label, h2 {
            font-family: 'Konkhmer Sleokchher', sans-serif;
          }
          @media (max-width: 768px) {
            .container {
              flex-direction: column;
              width: 95%;
            }
            .logo-section {
              width: 100%;
              padding: 10px;
            }
            .form-section {
              width: 100%;
              padding: 20px;
            }
            h2 {
              font-size: 20px;
            }
            form {
              width: 100%;
            }
          }
        `}
      </style>
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
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            maxWidth: '900px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Logo Section */}
          <div
            className="logo-section"
            style={{
              backgroundColor: '#000',
              color: '#fff',
              width: '50%',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={PrepPrimeLogo}
              alt="PREPPRIME Logo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Form Section */}
          <div
            className="form-section"
            style={{
              width: '50%',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <a
              href="/login"
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                fontSize: '20px',
                color: '#2c5b97',
                textDecoration: 'none',
              }}
            >
              ←
            </a>

            <h2
              style={{
                fontSize: '24px',
                marginBottom: '15px',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Forgot Password
            </h2>
            <p
              style={{
                fontSize: '14px',
                marginBottom: '20px',
                color: '#666',
                textAlign: 'center',
              }}
            >
              Enter the email address associated with your account.
            </p>

            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#333',
                    marginBottom: '5px',
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
                  width="100%"
                  disabled={isSubmitting}
                />
              </div>
              {errorMessage && (
                <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
              )}
              <GeneralButton
                text={isSubmitting ? 'Submitting...' : 'Send OTP'}
                text_color={[255, 255, 255]}
                button_color={[44, 91, 151]}
                width="100%"
                height="37px"
                disabled={isSubmitting}
              />
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontSize: '12px', color: '#555' }}>
                Prepprime © Copyright 2024
              </p>
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
    </>
  );
};

export default Forgotpasspage;
