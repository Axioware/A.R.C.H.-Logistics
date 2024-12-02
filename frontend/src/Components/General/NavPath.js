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
  hyperlink_size,  // Array of size strings for hyperlinks
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
        const size = hyperlink_size[index];
        console.log(size[1]);

        return (
          <div key={index} style={{ marginRight: '2%', marginLeft: '10px', display: 'flex', flexDirection: 'row'}}>
            {/* Render HyperLink component with dynamic props */}
            <HyperLink
              text={linkText}
              path={path}
              text_color={text_color}  // Pass the text color to the HyperLink component
              // background_color={[0, 0, 0]}  // Optional, if you want the same background for links
              hover_background_color={[[255, 255, 255]]}  // Optional, for hover effect on link
              width={size[0]}  // Set the width from hyperlink_size
              height={size[1]}  // Set the height from hyperlink_size
            />

            <span style={{ marginLeft: '40px', fontSize: '20px', color: tcolor, display: 'flex', flexDirection: 'row', position: 'relative', marginTop: '-5px'}}>&gt;</span>
          </div>
        );
      })}

      {/* Internal CSS Styling */}
      <style>
        {`
          .navpath-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            width: ${width || 'auto'};
            height: ${height || 'auto'};
            background-color: ${bgColor || 'transparent'};
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
