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
  height
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
      style={{
        width: width || 'auto',  // Use provided width or default to auto
        height: height || 'auto',  // Use provided height or default to auto
        minHeight: height || 'auto', // Ensure min-height is set
        display: 'flex',
        flexDirection: 'row', // Make sure the div is a flex container
        justifyContent: 'center', // Center the text horizontally
        alignItems: 'center', // Center the text vertically
      }}
    >
      <span
        style={{
          color: color, // Dynamically set text color using the converted RGB value
        }}
      >
        {text} 
      </span>

      <style>
        {`
          .hyperlink {
            border-radius: 5px;
            padding: 10px;
            text-decoration: none;
            cursor: pointer;
            text-align: center;
            width: ${width || 'auto'};
            height: ${height || 'auto'};
            
          }

          .hyperlink:hover {
            background-color: ${hoverBgColor || '#4CAF50'};  /* Use the passed hover background color */
          }

          .hyperlink span {
            font-size: 16px;
            font-weight: bold;
            position: absolute;
          }
        `}
      </style>
    </div>
  );
}
