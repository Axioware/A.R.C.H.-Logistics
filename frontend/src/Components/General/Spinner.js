import React, { useEffect } from 'react';

// Spinner Component
const Spinner = () => {
  // Spinner styles
  const spinnerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height to center the spinner
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent background
  };

  const spinnerCircleStyles = {
    border: '4px solid #f3f3f3', // Light gray
    borderTop: '4px solid #3498db', // Blue color for the spinner
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite', // Make it spin
  };

  // Define the keyframes for the spinner
  const spinAnimation = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // UseEffect to inject keyframes into the document's head
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = spinAnimation;
    document.head.appendChild(styleSheet);

    // Cleanup when component is unmounted
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={spinnerStyles}>
      <div style={spinnerCircleStyles}></div>
    </div>
  );
};

export default Spinner;
