import React from 'react';
import HyperLink from './HyperLink';  // Assuming HyperLink component is available

// Function to convert RGB array to 'rgb(r, g, b)' string
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  // Return default color if input is invalid
  return 'rgb(0, 0, 0)';
}

export default function NavPath({
  text,
  paths,
  text_color,  // Array of RGB values for text color
  background_color,  // Array of RGB values for background color
  width,
  height
}) {
  // Convert background color to rgb string
  const bgColor = rgbArrayToString(background_color);
  const tcolor = rgbArrayToString(text_color);

  return (
    <div className="navpath-container">
      {/* Loop through the text and paths arrays */}
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      {text.map((linkText, index) => {
        // Get the corresponding path, text color, and size for each hyperlink
        const path = paths[index];
        var arr = index !== text.length - 1;

        return (
          <>
            <HyperLink
              text={linkText}
              path={path}
              text_color={text_color}  // Pass the text color to the HyperLink component
              width={'200px'}  // Set the width from hyperlink_size
              height={'20px'}
              arrow={arr}  // Set the height from hyperlink_size
            />

            {/* <span style={{ marginLeft: '40px', fontSize: '20px', color: tcolor, display: 'flex', flexDirection: 'row', position: 'relative', marginTop: '-5px'}}>&gt;</span> */}
          </>
        );
      })}

      {/* Internal CSS Styling */}
      <style>
        {`
          .navpath-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            border-radius: 5px;
            width: ${width || 'auto'};
            height: ${height || 'auto'};
            background-color: ${bgColor || 'transparent'};
            margin: 50px 0px 25px 0px;

          }
        `}
      </style>
    </div>
  );
}
