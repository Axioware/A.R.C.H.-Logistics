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
        {icon && <img src={SearchIcon} alt="Search Icon" className="Search-icon" />}
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
            width: ${width}; /* Apply width */
            height: ${height}; /* Apply height */
            margin: 0px 40px 0px 0px;
            display: flex;
            align-items: center;
          }

          .Search-icon-container {
            margin-right: 10px; /* Space between icon and input field */
          }

          .Search-bar-input {
            width: 100%;
            height: 100%;
            padding: 10px;
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
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .Search-bar-container {
              flex-direction: column; /* Stack input and icon vertically on smaller screens */
              margin: 10px; /* Adjust margin */
            }

            .Search-bar-input {
              font-size: 1.2rem; /* Adjust font size on smaller screens */
              padding: 8px; /* Reduce padding for a more compact input */
            }

            .Search-icon-container {
              margin-right: 0px; /* Remove right margin for icon */
            }

            .Search-icon {
              width: 18px; /* Adjust icon size on small screens */
              height: 18px;
            }
          }

          @media (max-width: 480px) {
            .Search-bar-container {
              margin: 10px 0px; /* Further adjust margin for very small screens */
            }

            .Search-bar-input {
              font-size: 1rem; /* Further reduce font size */
              padding: 6px; /* Further reduce padding */
            }

            .Search-icon {
              width: 16px; /* Reduce icon size on very small screens */
              height: 16px;
            }
          }
        `}
      </style>
    </div>
  );
}
