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
  // text,
  // text_color,
  // path,
  // background_color,
  // class_name = '',
  // width = 'auto',
  // height = 'auto',

  text,
  text_color,
  path,
  background_color,
  class_name,
  width,
  height,
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
            justify-content: center;
            align-items: center;
            height: 100vh; /* Full viewport height for centering */
            margin: 0;
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
          }

          .add-button:hover {
            background-color: rgba(56, 21, 90, 0.8); /* Darker shade on hover */
          }
        `}
      </style>
    </div>
  );
}
