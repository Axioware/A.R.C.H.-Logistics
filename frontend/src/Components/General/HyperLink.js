import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  // Return default color if input is invalid
  return 'rgb(0, 0, 0)';
}

export default function HyperLink({
  text,
  path,
  text_color,  // Accept color prop (array of RGB values)
  width,
  height
}) {
  const navigate = useNavigate();  // Use the useNavigate hook for navigation

  // Convert the RGB array to the proper CSS string for text color
  const color = rgbArrayToString(text_color);

  // Handle the click event for navigation
  const handleClick = () => {
    navigate(path);  // Navigate to the path provided
  };

  return (
    <div
      className="hyperlink"
      onClick={handleClick}
      style={{
        width: width,
        height: height,
      }}
    >
      <span
        style={{
          color: color, // Dynamically set color using the converted RGB value
        }}
      >
        {text}
      </span>

      <style>
        {`
          .hyperlink {
            display: inline-block;
            background-color: #f0f0f0;
            border-radius: 5px;
            padding: 10px;
            text-decoration: none;
            cursor: pointer;
            text-align: center;
          }

          .hyperlink:hover {
            background-color: #dcdcdc;
          }

          .hyperlink span {
            font-size: 16px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}
