import React from 'react';
import PropTypes from 'prop-types';

const TopNavBar = ({
  background_color,
  text_color,
  logo,
  company_name,
  company_name_color,
  username,
  username_color,
}) => {
  // Convert RGB arrays to CSS-compatible strings
  const backgroundColor = `rgb(${background_color.join(',')})`;
  const defaultTextColor = `rgb(${text_color.join(',')})`;
  const companyNameColor = `rgb(${company_name_color.join(',')})`;
  const usernameColor = `rgb(${username_color.join(',')})`;

  return (
    <>
      {/* Internal CSS using a <style> tag */}
      <style>
        {`
          .top-nav-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            background-color: ${backgroundColor};
            color: ${defaultTextColor};
          }
          .logo {
            height: 30px;
          }
          .company-name {
            margin: 0;
            color: ${companyNameColor};
          }
          .username {
            margin: 0;
            color: ${usernameColor};
          }
        `}
      </style>
      <nav className="top-nav-bar">
        <img src={logo} alt={`${company_name} logo`} className="logo" />
        <h1 className="company-name">{company_name}</h1>
        <p className="username">{username}</p>
      </nav>
    </>
  );
};

TopNavBar.propTypes = {
  background_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  text_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  logo: PropTypes.string.isRequired,
  company_name: PropTypes.string.isRequired,
  company_name_color: PropTypes.arrayOf(PropTypes.number).isRequired,
  username: PropTypes.string.isRequired,
  username_color: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TopNavBar;
