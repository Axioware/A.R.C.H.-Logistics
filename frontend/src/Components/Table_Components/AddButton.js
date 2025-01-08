import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)'; // Default color if input is invalid
}

export default function AddButton({
  text,
  text_color,
  path,
  background_color,
  class_name,
  width = '150px', // Default width
  height = '50px', // Default height
}) {
  const navigate = useNavigate();

  const buttonColor = rgbArrayToString(background_color);
  const textColor = rgbArrayToString(text_color);

  return (
    <div className="add-button-container">
      <button
        className={`add-button ${class_name}`}
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
            padding: 10px; /* Add some padding for smaller screens */
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
            border: 2px solid black;
          }

          .add-button:hover {
            background-color: rgba(255, 255, 255, 0.8); /* Change background on hover */
            color: black; /* Text color changes to black on hover */
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .add-button-container {
              justify-content: center; /* Center button on smaller screens */
            }

            .add-button {
              width: 120px; /* Make button smaller on mobile */
              height: 40px;
              font-size: 0.9rem; /* Slightly smaller text */
            }
          }

          @media (max-width: 480px) {
            .add-button {
              width: 100px; /* Further reduce button size */
              height: 35px;
              font-size: 0.8rem; /* Further reduce font size */
            }
          }

          /* Lock layout for screens narrower than 1366px */
          @media (max-width: 1366px) {
            body {
              width: 1920px;
              transform: scale(0.7); /* Scale down to fit smaller screens */
              transform-origin: top left;
              overflow-x: auto; /* Allow horizontal scrolling */
            }

            .add-button {
              width: 150px;
              height: 50px;
              font-size: 1rem; /* Maintain original size for 1920x1080 view */
            }
          }

          /* Maintain responsiveness above 1366px */
          @media (min-width: 1366px) {
            .add-button-container {
              justify-content: flex-end; /* Default alignment */
            }

            .add-button {
              width: ${width};
              height: ${height};
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}
