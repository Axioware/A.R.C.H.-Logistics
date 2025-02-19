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
  background_color, // Background color prop
  hover_background_color, // Hover background color prop
  height,
  arrow
}) {
  const navigate = useNavigate();  // Use the useNavigate hook for navigation

  // Convert the RGB array to the proper CSS string for text color
  const color = rgbArrayToString(text_color);
  // const bgColor = rgbArrayToString(background_color); // Convert background_color to string
  const hoverBgColor = rgbArrayToString(hover_background_color); // Convert hover_background_color to string
  const bcolor = rgbArrayToString(background_color);

  // Handle the click event for navigation
  const handleClick = () => {
    navigate(path);  // Navigate to the path provided
  };

  return (
    <div
      className="hyperlink"
      onClick={handleClick}
    >
      <style>
        {`
          .hyperlink {
            border-radius: 5px;
            padding: 10px;
            text-decoration: none;
            color: white;
            cursor: pointer;
            text-align: center;
            width: ${width || 'auto'};
            height: ${height || 'auto'};
          }
        `}
      </style>
    </div>
  );
}
