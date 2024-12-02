import React, { useState } from 'react';
import profileIcon from '../../Assets/Images/Login/Profile Icon.avif'; // Ensure the path to your image is correct

const UserDrop = ({ userName }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleProfileDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '10px',
      right: '20px',
    },
    img: {
      width: '28px',
      cursor: 'pointer',
      padding: '20px 20px 20px 4px',
      borderRadius: '50%', // Circle effect for profile icon
      transition: '0.3s ease', // Smooth transition for hover effect
    },
    dropdownContainer: {
      position: 'relative',
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      background: '#fff',
      listStyle: 'none',
      padding: '10px 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      display: isDropdownVisible ? 'block' : 'none',
      width: '200px', // Optional: Control the width of the dropdown menu
      zIndex: 10, // Ensure the dropdown is above other elements
    },
    dropdownItem: {
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: '0.2s ease', // Smooth transition on hover
    },
    dropdownLink: {
      textDecoration: 'none',
      color: '#333',
      display: 'block', // Make the entire item clickable
    },
    dropdownItemHover: {
      backgroundColor: '#f0f0f0', // Light gray background on hover
      borderRadius: '5px',
    },
    imgHover: {
      transform: 'scale(1.1)', // Slight zoom effect on hover
    },
  };

  return (
    <div style={styles.container}>
      {/* Username */}
      <p style={{ marginRight: '10px', fontSize: '20px', fontWeight: '600' }}>{userName}</p>

      {/* Profile Icon */}
      <img
        src={profileIcon} // Make sure this points to the correct location of your image
        alt="Profile Icon"
        style={styles.img}
        onClick={toggleProfileDropdown}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} // Hover effect for the icon
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Revert to normal scale
      />

      <div style={styles.dropdownContainer}>
        {/* Dropdown Menu */}
        <ul style={styles.dropdownMenu}>
          <li
            style={styles.dropdownItem}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')} // Hover effect for items
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')} // Reset hover effect
          >
            <a href="/" style={styles.dropdownLink}>
              Edit Profile
            </a>
          </li>
          <li
            style={styles.dropdownItem}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <a href="/" style={styles.dropdownLink}>
              Reset Password
            </a>
          </li>
          <li
            style={styles.dropdownItem}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <a href="/" style={styles.dropdownLink}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDrop;
