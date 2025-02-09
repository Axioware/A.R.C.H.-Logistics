import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to convert RGB array or string to 'rgb(r, g, b)' string
function rgbArrayToString(color) {
  if (Array.isArray(color) && color.length === 3) {
    const [r, g, b] = color;
    return `rgb(${r}, ${g}, ${b})`;
  } else if (typeof color === 'string') {
    return color; // If it's a valid color string like 'black' or 'white', return it directly
  }
  return 'rgb(0, 0, 0)'; // Default color if input is invalid
}

export default function ModalOpener({
  text,
  text_color,
  func,
  background_color,
  width = '135px',
  height = '45px',
}) {

  const buttonColor = rgbArrayToString(background_color);
  const textColor = rgbArrayToString(text_color);

  return (
    <div className="add-button-container">
      <button
        className="add-button"
        onClick={func}
      >
        {text}
      </button>

      <style>
        {`
          .add-button-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 8vh;
            margin: 0px;
            font-weight: bold;
            padding: 10px 0px 10px 10px;
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
            transition: all 0.3s ease;
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center; /* Centers text vertically */
            justify-content: center; /* Centers text horizontally */
            white-space: nowrap;
          }

          .add-button:hover {
            background-color: rgba(255, 255, 255, 0.8);
            color: black;
            box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .add-button-container {
              justify-content: center;
            }

            .add-button {
              width: 120px;
              height: 40px;
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            .add-button {
              width: 100px;
              height: 35px;
              font-size: 0.8rem;
            }
          }
        `}
      </style>
    </div>
  );
}
