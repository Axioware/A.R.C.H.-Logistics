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
            justify-content: flex-end; /* Align button to the right */
            align-items: center;
            height: 10vh; /* Adjust as necessary */
            margin: 0px 70px 0px 0px; /* Add some vertical spacing */
            font-weight: bold;
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
          }

          .add-button:hover {
            background-color: rgba(255, 255, 255, 0.8); /* Change background on hover */
            color: black; /* Text color changes to black on hover */
          }
        `}
      </style>
    </div>
  );
}
