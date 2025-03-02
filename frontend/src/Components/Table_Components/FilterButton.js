import React, { useState } from "react";
import COLORS from "../../Assets/JS/Color";

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return "rgb(0, 0, 0)"; // Default color if input is invalid
}

export default function FilterButton({
  text,
  text_color = COLORS.WHITE,
  background_color = COLORS.PRIMARY_BLUE,
  function: handleClick,
  content,
  width = "100px",
  height = "36px",
}) {
  // Convert colors to CSS string format
  const textColor = rgbArrayToString(text_color);
  const buttonColor = rgbArrayToString(background_color);
  const [isVisible, setIsVisible] = useState(false);

  function show() {
    setIsVisible(!isVisible);
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className="filter-button" onClick={show}>
        {text}
      </button>

      <div
        className="content"
        style={{
          display: isVisible ? "block" : "none",
          position: "absolute",
          top: "100%",
          left: "0",
          zIndex: 1000,
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "5px",
          width: "300px", // Increased width of the content box
        }}
      >
        {content}
      </div>

      <style>
        {`
          .filter-button {
            color: ${textColor};
            background-color: ${buttonColor};
            font-size: 0.9em;
            border: 2px solid ${textColor};
            transition: all 0.3s ease;
            width: ${width};
            height: ${height};
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            outline: none;
            margin: 0px 0px 0px 0px;
          }

          .filter-button:hover {
            background-color: ${textColor};
            color: ${buttonColor};
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          .filter-button:active {
            transform: translateY(1px);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .filter-button {
              width: 80px;
              height: 32px;
              font-size: 0.8em;
            }
          }

          @media (max-width: 480px) {
            .filter-button {
              width: 70px;
              height: 28px;
              font-size: 0.75em;
            }
          }
        `}
      </style>
    </div>
  );
}
