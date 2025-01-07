import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons
import SearchIcon from '../../Assets/Images/SearchIcon.png'; // Import custom search icon image

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
  function: handleSearch,
  width = 'auto',
  height = 'auto',
  icon
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
      style={{ width, height }}  
    >
      <div className="Search-icon-container">
        {icon ? <FaSearch className="Search-icon" /> : <img src={SearchIcon} alt="Search Icon" className="Search-icon" />}
      </div>
      <input
        type="text"
        placeholder={hint}
        className="Search-bar-input"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ backgroundColor: fieldColor }} // Input background color
      />
      <style>
        {`
          .Search-bar-container {
            position: relative;
            width: ${width}; /* Apply width */
            height: ${height}; /* Apply height */
            display: flex;
            align-items: center;
            margin: 0px 40px 0px 0px;
          }

          .Search-icon-container {
            position: absolute;
            left: 10px; /* Position the icon inside the input field */
            z-index: 1; /* Make sure the icon appears above the input */
          }

          .Search-bar-input {
            width: 100%;
            height: 100%;
            padding: 10px 10px 10px 40px; /* Add extra left padding to create space between the icon and the text */
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 1rem;
            outline: none;
            transition: background-color 0.3s ease;
          }

          .Search-bar-input:focus {
            border-color: #007bff; /* Focused input border color */
          }

          .Search-icon {
            width: 20px;
            height: 20px;
            color: #aaa; /* Dim the color of the search icon */
          }

          .Search-bar-input::placeholder {
            color: #aaa; /* Set the placeholder color to match the icon */
          }
        `}
      </style>
    </div>
  );
}
