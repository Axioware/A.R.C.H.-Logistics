import React from 'react';
import PropTypes from 'prop-types';
import UserDrop from './UserDrop';
// import archLabs from '../../Assets/Images/A.R.C.H Labs.jpg';

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
            padding: 10px 20px; /* Add padding for better spacing */
            background-color: ${backgroundColor};
            color: ${defaultTextColor};
          }
          .center-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
          }
          .company-name {
            margin: 0;
            color: ${companyNameColor};
            font-size: 25px; /* Adjust font size as needed */
            font-weight: bold; /* Make the text bold */
          }
          .logo {
            height: 30px;
            margin-right: 20px; /* Space between logo and company name */
          }
        `}
      </style>
      <nav className="top-nav-bar">
        {/* Uncomment this line if a logo is needed */}
        {/* <img src={archLabs} alt={`${company_name} logo`} className="logo" /> */}
        <div className="center-container">
          <h1 className="company-name">{company_name}</h1>
        </div>
        <UserDrop userName={username} />
      </nav>
    </>
  );
};

export default TopNavBar;
