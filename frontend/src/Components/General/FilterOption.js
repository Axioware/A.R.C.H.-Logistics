import React, { useState } from "react";

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return "rgb(0, 0, 0)"; // Default color if input is invalid
}

export default function FilterOption({
  text = "Category",
  text_color = [255, 255, 255],
  background_color = [23, 23, 23],
  width = "150px", // Set default width instead of "auto"
  height = "45px",
  options = ["FBA", "FBM", "Others"],
  selectedCategory,
  setSelectedCategory,
}) {
  // Convert colors to CSS string format
  const textColor = rgbArrayToString(text_color);
  const buttonColor = rgbArrayToString(background_color);
  const [isVisible, setIsVisible] = useState(false);

  function show() {
    setIsVisible(!isVisible);
  }

  function handleSelect(option) {
    setSelectedCategory(option);
    setIsVisible(false);
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className="filter-button" onClick={show}>
        {selectedCategory || text}
      </button>

      <div
        className="content"
        style={{
          display: isVisible ? "block" : "none",
          position: "absolute",
          top: "100%",
          left: "0",
          zIndex: 1000,
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "5px",
          width: "300px",
        }}
      >
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>

      <style>
        {`
          .filter-button {
            color: ${textColor};
            background-color: ${buttonColor};
            font-size: 1rem;
            border: 2px solid ${textColor};
            transition: all 0.3s ease;
            width: ${width}; /* Fixed width to prevent resizing */
            height: ${height};
            min-width: 120px; /* Ensures the button never shrinks too much */
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            outline: none;
            margin: 0px;
            text-align: center;
            white-space: nowrap; /* Prevents text from wrapping */
            overflow: hidden; /* Prevents text overflow */
            text-overflow: ellipsis; /* Adds '...' if text is too long */
          }

          .filter-button:hover {
            background-color: ${textColor};
            color: ${buttonColor};
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          .filter-button:active {
            transform: translateY(1px);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          }

          .dropdown-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .dropdown-list li {
            padding: 10px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .dropdown-list li:hover {
            background: #f0f0f0;
          }
        `}
      </style>
    </div>
  );
}
