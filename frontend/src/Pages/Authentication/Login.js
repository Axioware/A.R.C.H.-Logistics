import React from 'react';
import LoginForm from '../../Components/Authentication/LoginForm';
import bg from '../../Assets/Images/Login/background.jpg';

const Login = () => {
  const styles = {
    page: {
      backgroundColor: '#e0e0e0',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      filter: 'saturate(0.8)',
    },
  };

  return (
    <div style={styles.page}>
      <LoginForm />
    </div>
  );
};

export default Login;
