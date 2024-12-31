import React from 'react';

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)'; // Default color if input is invalid
}

export default function PageHeading({
  text,
  text_color,
  width = '100%', // Default to 100% width
  height = 'auto', // Default height
  sidebar_color,
  font_size = '2rem',
  sidebar_width = '10px', // Default sidebar width
}) {
  // Convert colors to CSS string format
  const textColor = rgbArrayToString(text_color);
  const sidebarColor = rgbArrayToString(sidebar_color);

  return (
    <div className="page-heading-container">
      <div
        className="page-heading-sidebar"
        style={{
          backgroundColor: sidebarColor,
          width: sidebar_width,
        }}
      ></div>
      <h1 className="page-heading-text">{text}</h1>

      <style>
        {`
          .page-heading-container {
            display: flex;
            flex-direction: row; /* Ensures sidebar stays on the left */
            align-items: center; /* Align items vertically */
            width: ${width};
            height: ${height};
          }

          .page-heading-sidebar {
            height: 100%; /* Sidebar height matches container height */
            flex-shrink: 0; /* Prevent sidebar from shrinking */
          }

          .page-heading-text {
            color: ${textColor};
            font-size: ${font_size}; /* Use font_size prop */
            font-weight: bold; /* Make text bold */
            margin-left: 10px; /* Space between sidebar and text */
            white-space: nowrap; /* Prevent wrapping */
            overflow: hidden;
            text-overflow: ellipsis; /* Add ellipsis for overflowing text */
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .page-heading-container {
              flex-direction: column; /* Stack items vertically on smaller screens */
              align-items: flex-start; /* Align items to the left */
            }

            .page-heading-text {
              font-size: 1.5rem; /* Adjust font size on smaller screens */
              margin-left: 0px; /* Remove space between sidebar and text */
              text-align: center; /* Center text on small screens */
            }

            .page-heading-sidebar {
              width: 5px; /* Reduce sidebar width on smaller screens */
            }
          }

          @media (max-width: 480px) {
            .page-heading-container {
              margin: 20px 0px; /* Reduce margin for very small screens */
            }

            .page-heading-text {
              font-size: 1.2rem; /* Further reduce font size */
            }

            .page-heading-sidebar {
              width: 4px; /* Further reduce sidebar width */
            }
          }
        `}
      </style>
    </div>
  );
}
