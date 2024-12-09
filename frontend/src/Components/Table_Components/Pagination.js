import React from 'react';

// Utility function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)'; // Default color: black
}

export default function Pagination({
  current_page,
  total_pages,
  text_color = [0, 0, 0],
  button_text_color = [255, 255, 255],
  button_background_color = [34, 53, 83], // Navy blue color for buttons
  width = '100%',
  height = '60px',
  onNext, // Function to handle 'Next' button click
  onPrev, // Function to handle 'Previous' button click
}) {
  const textColor = rgbArrayToString(text_color);
  const buttonTextColor = rgbArrayToString(button_text_color);
  const buttonBgColor = rgbArrayToString(button_background_color);

  return (
    <div className="pagination-container">
      {/* Remove the old button code and replace it with the new design */}
      <button
        className="pagination-button"
        onClick={onPrev}
        disabled={current_page <= 1}
        style={{ width: '120px' }} // Consistent width
      >
        <span className="arrow prev-arrow">&larr;</span> Previous
      </button>

      <div className="page-display">
        Page {current_page} of {total_pages}
      </div>

      <button
        className="pagination-button"
        onClick={onNext}
        disabled={current_page >= total_pages}
        style={{ width: '120px' }} // Consistent width
      >
        Next <span className="arrow next-arrow">&rarr;</span>
      </button>

      <style>
        {`
          .pagination-container {
            width: ${width};
            height: ${height};
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 30px 30px;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
            margin: 0px 100px 0px 100px ;
          }

          .pagination-button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            padding: 10px 20px; /* Adjusted padding for better spacing */
            background-color: ${buttonBgColor};
            color: ${buttonTextColor};
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            font-weight: bold;
            text-align: center; /* Center-align text */
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          }

          .pagination-button:disabled {
            background-color: #cccccc; /* Gray color for disabled state */
            cursor: not-allowed;
          }

          .pagination-button:not(:disabled):hover {
            background-color: rgba(34, 53, 83, 0.9); /* Slightly darker on hover */
            transform: scale(1.05); /* Slight enlargement */
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
          }

          /* Arrow movement on hover */
          .pagination-button:not(:disabled):hover .arrow {
            transition: transform 0.2s ease; /* Smooth animation */
          }

          /* Forward movement for 'Next' button arrow */
          .pagination-button:not(:disabled):hover .next-arrow {
            transform: translateX(5px); /* Move the arrow 5px forward */
          }

          /* Backward movement for 'Previous' button arrow */
          .pagination-button:not(:disabled):hover .prev-arrow {
            transform: translateX(-5px); /* Move the arrow 5px backward */
          }

          .page-display {
            font-size: 15px;
            font-weight: 350;
            color: ${textColor};
            text-align: center; /* Center-align the text in the page display */
          }

          .arrow {
            font-size: 13px;
            transition: transform 0.2s ease; /* Add transition for smooth animation */
          }

          .app-container {
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
  