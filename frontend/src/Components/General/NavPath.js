import React from 'react';
import HyperLink from './HyperLink';  // Assuming HyperLink component is in the same directory

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
  hyperlink_size,  // Array of size strings for hyperlinks
  width,
  height
}) {
  // Convert background color to rgb string
  const bgColor = rgbArrayToString(background_color);

  return (
    <div
      className="navpath-container"
      style={{
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: bgColor,  // Apply the background color to the div
        display: 'flex',
        flexDirection: 'row',  // Stack hyperlinks vertically
        justifyContent: 'space-around',
        padding: '10px',
        borderRadius: '5px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}> {/* Added flexWrap to allow wrapping */}
        {text.map((linkText, index) => {
          // Get the corresponding path, text color, and size for each hyperlink
          const path = paths[index];
          const size = hyperlink_size[index];
          const color = rgbArrayToString(text_color);  // Convert RGB array for text color

          return (
            <div key={index} style={{ marginRight: '15px', display: 'flex', flexDirection: 'row'}}>
              {/* Render HyperLink component */}
              <HyperLink
                text={linkText}
                path={path}
                text_color={text_color}  // Pass the text color to the HyperLink component
                background_color={background_color}  // Optional, if you want the same background for links
                hover_background_color={background_color}  // Optional, for hover effect on link
                width={size[0]}  // Set the width from hyperlink_size
                height={size[1]}  // Set the height from hyperlink_size
              />
              {/* Optional <p> element */}
              {/* <p>hello world</p> */}
            </div>
          );
        })}
      </div>

      <style>
        {`
          .navpath-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            padding: 10px;
            border-radius: 5px;
          }

          .navpath-container a {
            padding: 10px;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
            text-align: center;
          }

          .navpath-container a:hover {
            background-color: #dcdcdc;
          }
        `}
      </style>
    </div>
  );
}
