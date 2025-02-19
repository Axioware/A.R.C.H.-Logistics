import React from 'react';
import COLORS from "../../Assets/JS/Color"

// Utility function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)'; // Default color: black
}

export default function Pagination({
  success, // New prop to determine visibility
  current_page,
  total_pages,
  text_color = [0, 0, 0],
  button_text_color = COLORS.WHITE,
  button_background_color = COLORS.PRIMARY_BLUE, // Navy blue color for buttons
  width = '100%',
  height = '40px',
  onNext, // Function to handle 'Next' button click
  onPrev, // Function to handle 'Previous' button click
}) {
  const textColor = rgbArrayToString(text_color);
  const buttonTextColor = rgbArrayToString(button_text_color);
  const buttonBgColor = rgbArrayToString(button_background_color);

  // Don't render pagination if there's an error (success === false)
  if (!success) {
    return null;
  }

  return (
    
    <div className="pagination-wrapper">
    <div className="Pagination-container">
      <button
        className="Pagination-button"
        onClick={onPrev}
        disabled={current_page <= 1}
        style={{ width: '100px' }} // Consistent width
      >
        <span className="Pagination-arrow Pagination-prev-arrow">&larr;</span> Previous
      </button>

      <div className="Pagination-page-display">
        Page {current_page} of {total_pages}
      </div>

      <button
        className="Pagination-button"
        onClick={onNext}
        disabled={current_page >= total_pages}
        style={{ width: '100px' }} // Consistent width
      >
        Next <span className="Pagination-arrow Pagination-next-arrow">&rarr;</span>
      </button>
    </div>

      <style>
        {`

          .pagination-wrapper {
            width: 100%;
            display: flex;
            // margin-top: 20px;
            text-align: center;
            justify-content: center;
          }
          .Pagination-container {
            width: ${width};
            height: ${height};
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 23px 26px;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
            // margin: 20px 0px 0px 0px ;
          }

          .Pagination-button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            padding: 4px 0px; /* Adjusted padding for better spacing */
            background-color: ${buttonBgColor};
            color: ${buttonTextColor};
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            text-align: center; /* Center-align text */
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          }

          .Pagination-button:disabled {
            background-color: #cccccc; /* Gray color for disabled state */
            cursor: not-allowed;
          }

          .Pagination-button:not(:disabled):hover {
            background-color: rgba(34, 53, 83, 0.9); /* Slightly darker on hover */
            transform: scale(1.05); /* Slight enlargement */
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
          }

          /* Arrow movement on hover */
          .Pagination-button:not(:disabled):hover .Pagination-arrow {
            transition: transform 0.2s ease; /* Smooth animation */
          }

          /* Forward movement for 'Next' button arrow */
          .Pagination-button:not(:disabled):hover .Pagination-next-arrow {
            transform: translateX(5px); /* Move the arrow 5px forward */
          }

          /* Backward movement for 'Previous' button arrow */
          .Pagination-button:not(:disabled):hover .Pagination-prev-arrow {
            transform: translateX(-5px); /* Move the arrow 5px backward */
          }

          .Pagination-page-display {
            font-size: 13px;
            font-weight: 350;
            color: ${textColor};
            text-align: center; /* Center-align the text in the page display */
          }

          .Pagination-arrow {
            font-size: 12px;
            display: flex;
            margin-bottom: 3px;
            align-items: center;
            transition: transform 0.2s ease; /* Add transition for smooth animation */
          }

          .Pagination-app-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
          }
        `}
      </style>
    </div>
  );
}
