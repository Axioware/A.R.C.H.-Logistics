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
  text1,
  text2,
  path1,
  path2,
  text_color = [255, 255, 255],  // Array of RGB values for text color
  background_color = [23, 23, 23],  // Array of RGB values for background color
  width = '100%',
  height = '50px'
}) {
  // Convert background color to rgb string
  const bgColor = rgbArrayToString(background_color);
  const tcolor = rgbArrayToString(text_color);

  return (
    <div className="navpath-container">
      {/* Loop through the text and paths arrays */}
      {/* <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> */}
        
            {/* <HyperLink
              key={1}
              text={text1}
              path={path1}
              text_color={text_color}  // Pass the text color to the HyperLink component
              width={'50px'}  // Set the width from hyperlink_size
              // height={'20px'}
              // arrow={arr}  // Set the height from hyperlink_size
            />  */}
            

<div style={{ color: 'white', fontWeight: "bold", display: "flex", alignItems: "center", marginRight: "15px" }}>
    <h3>{text1}</h3>
</div>



<div style={{ color: 'white', fontWeight: "bold", display: "flex", alignItems: "center", marginRight: "15px" }}>
    <h3>&gt;</h3>
</div>


<div style={{ color: 'white', fontWeight: "bold", display: "flex", alignItems: "center", marginRight: "15px" }}>
    <h3>{text2}</h3>
</div>


      {/* Internal CSS Styling */}
      <style>
        {`
          .navpath-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            padding-left: 50px;
            border-radius: 5px;
            width: ${width || 'auto'};
            height: ${height || 'auto'};
            background-color: ${bgColor || 'transparent'};
            gap: 20px;
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            .navpath-container {
              flex-direction: column; /* Stack items vertically on smaller screens */
              margin: 30px 0px;
            }

            .navpath-container p {
              display: none; /* Hide extra space on smaller screens */
            }

            /* Make the HyperLink width more flexible */
            .navpath-container a {
              width: auto; /* Allow links to adjust their width */
              font-size: 1rem; /* Adjust font size */
            }
          }

          @media (max-width: 480px) {
            .navpath-container {
              margin: 20px 0px; /* Reduce the margin for very small screens */
            }

            .navpath-container a {
              font-size: 0.9rem; /* Further adjust font size */
            }
          }
        `}
      </style>
    </div>
  );
}
