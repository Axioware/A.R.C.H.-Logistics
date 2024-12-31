import React from 'react';

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
  width = 'auto',
  height
}) {
  // Convert colors to CSS string format
  const textColor = rgbArrayToString(text_color);
  const buttonColor = rgbArrayToString(background_color);

  return (
    <div>
      <button
        className={`filter-button`}
        onClick={handleClick}
      >
        {text}
      </button>

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

          .filter-button:focus {
            border-color: #007bff; /* Change border color on focus */
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); /* Add a glow effect on focus */
          }

          /* Media queries for responsiveness */
          @media (max-width: 768px) {
            .filter-button {
              width: 100%; /* Full width on smaller screens */
              font-size: 0.9rem; /* Slightly smaller font size */
              padding: 12px; /* Add padding for better touch interaction */
            }
          }

          @media (max-width: 480px) {
            .filter-button {
              font-size: 0.8rem; /* Smaller font size for very small screens */
              padding: 10px; /* Adjust padding for very small screens */
            }
          }
        `}
      </style>
    </div>
  );
}
