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
  field_color = [255, 255, 255],
  class_name = '',
  setSearch,
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
      setSearch(searchText); 
    }
  };

  return (
    <div className={`Search-bar-container ${class_name}`}>
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
            width: ${width};
            height: ${height};
            display: flex;
            align-items: center;
            margin: 0px 40px 0px 0px;
            transition: all 0.3s ease-in-out;
          }

          .Search-icon-container {
            position: absolute;
            left: 10px;
            z-index: 1;
          }

          .Search-bar-input {
            width: 100%;
            height: 68%;
            padding: 10px 10px 10px 40px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
          }

          .Search-bar-input:focus {
            border-color: #007bff;
          }

          .Search-icon {
            width: 20px;
            height: 20px;
            color: #aaa;
          }

          .Search-bar-input::placeholder {
            color: #aaa;
          }

          /* Responsive Styles */
          @media (max-width: 1024px) {
            .Search-bar-container {
              width: 80%;
              margin-right: 20px;
            }
          }

          @media (max-width: 768px) {
            .Search-bar-container {
              width: 60%; /* Decrease width */
              margin-right: 10px;
            }

            .Search-bar-input {
              font-size: 0.9rem;
              height: 50%; /* Decrease height */
              padding: 8px 8px 8px 35px; /* Adjust padding */
            }

            .Search-icon {
              width: 18px;
              height: 18px;
            }
          }

          @media (max-width: 480px) {
            .Search-bar-container {
              width: 50%; /* Further decrease width */
              margin-right: 5px;
            }

            .Search-bar-input {
              font-size: 0.85rem;
              height: 45%; /* Reduce height further */
              padding-left: 30px;
            }

            .Search-icon {
              width: 16px;
              height: 16px;
            }
          }
        `}
      </style>
    </div>
  );
}
