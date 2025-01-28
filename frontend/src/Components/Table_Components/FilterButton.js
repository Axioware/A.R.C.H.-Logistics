import React, { useState } from "react";

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)'; // Default color if input is invalid
}

export default function FilterButton({
  text,
  text_color,
  background_color,
  function: handleClick,
  content: Content,
  width = 'auto',
  height
}) {
  // Convert colors to CSS string format
  const textColor = rgbArrayToString(text_color);
  const buttonColor = rgbArrayToString(background_color);
  const [isVisible, setIsVisible] = useState(false);

  function show() {
    setIsVisible(!isVisible);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className={`filter-button`}
        onClick={show}
      >
        {text}
      </button>

      <div className='content' style={{ 
        display: isVisible ? 'block' : 'none', 
        position: 'absolute', 
        top: '100%', 
        left: '0', 
        zIndex: 1000, 
        backgroundColor: 'white', 
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        marginTop: '5px',
        width: '300px' // Increased width of the content box
      }}>
        <Content />
      </div>

      <style>
        {`
          .filter-button {
            color: ${textColor};
            background-color: ${buttonColor};
            font-size: 1rem;
            border: 2px solid ${textColor}; /* Border matching text color */
            transition: all 0.3s ease; /* Smooth transition for all styles */
            width: ${width};
            height: ${height};
            border-radius: 5px;
            font-weight: bold; /* Make the button text bold */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
            outline: none; /* Remove outline on focus */
            margin: 0px 0px 0px 0px;
          }

          .filter-button:hover {
            background-color: ${textColor}; /* Swap button color on hover */
            color: ${buttonColor}; /* Change text color to background color */
            transform: translateY(-3px); /* Lift button slightly on hover */
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
          }

          .filter-button:active {
            transform: translateY(1px); /* Slightly press the button when clicked */
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* Reduce shadow on click */
          }
        `}
      </style>
    </div>
  );
}