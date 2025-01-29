import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert RGB array to 'rgb(r, g, b)' string
// Function to convert RGB array or string to 'rgb(r, g, b)' string
function rgbArrayToString(color) {
  if (Array.isArray(color) && color.length === 3) {
    const [r, g, b] = color;
    return `rgb(${r}, ${g}, ${b})`;
  } else if (typeof color === 'string') {
    // If it's a valid color string like 'black' or 'white', return it directly
    return color;
  }
  return 'rgb(0, 0, 0)'; // Default color if input is invalid
}


export default function AddButton({
  text,
  text_color,
  path,
  background_color,
  width = '135px', // Default width
  height = '45px', // Default height
}) {
  const navigate = useNavigate();

  const buttonColor = rgbArrayToString(background_color);
  const textColor = rgbArrayToString(text_color);

  return (
    <div className="add-button-container">
      <button
        className={`add-button`}
        onClick={() => navigate(path)} // Redirect to the given path when clicked
      >
        {text}
      </button>

      <style>
        {`
          .add-button-container {
            display: flex;
            justify-content: flex-end; /* Align button to the right on larger screens */
            align-items: center;
            height: 8vh; /* Adjust as necessary */
            margin: 0px; /* Add some vertical spacing if needed */
            font-weight: bold;
            padding: 10px 0px 10px 10px; /* Add some padding for smaller screens */
          }

          .add-button {
            color: ${textColor};
            background-color: ${buttonColor};
            width: ${width};
            height: ${height};
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            font-size: 1rem;
            text-align: center;
            box-sizing: border-box;
            transition: all 0.3s ease; /* Smooth hover effect */
            // border: 2px solid black;
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); /* Add shadow */
          }

          .add-button:hover {
            background-color: rgba(255, 255, 255, 0.8); /* Change background on hover */
            color: black; /* Text color changes to black on hover */
            box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .add-button-container {
              justify-content: center; /* Center button on smaller screens */
            }

            .add-button {
              width: 120px; /* Make button smaller on mobile */
              height: 40px;
              font-size: 0.5rem; /* Slightly smaller text */
            }
          }

          @media (max-width: 480px) {
            .add-button {
              width: 100px; /* Further reduce button size */
              height: 35px;
              font-size: 0.8rem; /* Further reduce font size */
            }
          }
        `}
      </style>
    </div>
  );
}
