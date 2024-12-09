import React from 'react';

function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(255, 255, 255)'; 
}

export default function MainBackground({
  background_color,
  border_color,
  height = '100%',
  width = '100%', 
  children,
}) {
  const backgroundColor = rgbArrayToString(background_color);
  const borderColor = rgbArrayToString(border_color);

  return (
    <div className="main-background">
      {children}
      <style>
        {`
          .main-background {
            width: ${width}; /* Width of the div */
            height: ${height}; /* Height of the div */
            background-color: ${backgroundColor}; /* Set background color */
            border: 3px solid ${borderColor}; /* Set border color */
            border-radius: 8px; /* Optional rounded corners */
            box-sizing: border-box; /* Ensure padding doesn't affect dimensions */
            padding: 20px; /* Optional padding for content */
            display: flex; /* Flexbox for better alignment */
            justify-content: center; /* Center content horizontally */
            align-items: center; /* Center content vertically */
          }
          .app-container {
            padding: 50px;
            background-color: #f0f0f0; /* Light gray background for the app */
            min-height: 100vh; /* Full viewport height */
            box-sizing: border-box; /* Ensure padding doesn't affect dimensions */
          }
    
        `}
      </style>
    </div>
  );
}
