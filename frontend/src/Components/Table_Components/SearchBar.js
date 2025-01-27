import React, { useState } from 'react';
import SearchIcon from '../../Assets/Images/SearchIcon.png';

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)'; // Default color if input is invalid
}

export default function SearchBar({
  hint,
  field_color,
  class_name = '',
  handleSearch,
  width = 'auto',
  height = 'auto',
  icon = true
}) {
  const [searchText, setSearchText] = useState('');
  const fieldColor = rgbArrayToString(field_color);

  // Handle input change
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle search button click
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchText); 
    }
  };

  return (
    <div
      className={`Search-bar-container ${class_name}`}
      style={{ width, height, position: 'relative' }} // Add position relative here
    >
      {icon && (
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="Search-icon"
          style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
        />
      )}
      <input
        type="text"
        placeholder={hint}
        className="Search-bar-input"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{
          backgroundColor: fieldColor,
          paddingLeft: icon ? '40px' : '10px', // Adjust padding to make space for the icon
        }}
      />
      <style>
        {`
          .Search-bar-container {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden; // Ensure the container clips the contents properly
          }

          .Search-bar-input {
            width: 100%;
            height: 100%;
            padding: 10px 10px 10px 40px; // Add left padding to make space for the icon
            border: none; // Remove border to integrate with the container
            font-size: 1rem;
            outline: none;
            transition: background-color 0.3s ease, border-color 0.3s ease;
          }

          .Search-bar-input:focus {
            box-shadow: inset 0 0 8px rgba(0, 123, 255, 0.25); // Optional focus style
          }

          .Search-icon {
            width: 20px;
            height: 20px;
          }
        `}
      </style>
    </div>
  );
}
