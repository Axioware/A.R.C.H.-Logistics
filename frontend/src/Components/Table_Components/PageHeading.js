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
  class_name,
  width,
  height,
  sidebar_color,
  font_size = '2rem', 
}) {
  // Convert colors to CSS string format
  const textColor = rgbArrayToString(text_color);
  const sidebarColor = rgbArrayToString(sidebar_color);

  return (
    <div className={`page-heading-container ${class_name}`} style={{ width, height }}>
      <div className="sidebar" style={{ backgroundColor: sidebarColor }}></div>
      <h1 className="page-heading-text" style={{ fontSize: font_size }}>{text}</h1>

      <style>
        {`
          .page-heading-container {
            display: flex;
            flex-direction: row; /* Horizontal layout for sidebar and text */
            align-items: center;
            justify-content: flex-start;
            width: ${width};
            height: ${height};
            margin: 0px 0px 0px 0px;

          }

          .page-heading-text {
            color: ${textColor};
            font-size: ${font_size}; /* Use the font_size prop */
            margin: 0;
            padding-left: 10px; /* Space between sidebar and text */
            text-align: left;
            font-weight: bold; /* Make text bold */
            white-space: nowrap; /* Ensure text stays on one line */
            // overflow: hidden;
            text-overflow: ellipsis; /* Add ellipsis if text overflows */
          }
        `}
      </style>
    </div>
  );
}
