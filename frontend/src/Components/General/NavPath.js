import React from 'react';
import HyperLink from './HyperLink';
import { useNavigate } from 'react-router-dom';  // Assuming HyperLink component is available

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
  text_color = [255, 255, 255],  // Array of RGB values for text color
  background_color = [23, 23, 23],  // Array of RGB values for background color
  width = "100%",
  height = "45px"
}) {
  // Convert background color to rgb string
  const bgColor = rgbArrayToString(background_color);
  const tcolor = rgbArrayToString(text_color);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path)
  };


  return (
    <div className="navpath-container">
      {/* Loop through the text and paths arrays */}
      {/* <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> */}
      {text.map((linkText, index) => {
        // Get the corresponding path, text color, and size for each hyperlink
        const path = paths[index];
        var arr = index !== text.length - 1;

        return (
          <>
            <div className='navpath-text' onClick={() => handleClick(path)}
            >
                <h3>{linkText}</h3>
            </div>

            { arr && <div style={{ color: 'white', fontWeight: "bold", display: "flex", alignItems: "center", marginRight: "15px", cursor: "default"}}>
                <h3>&gt;</h3>
            </div>
            }
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
            padding: 5px 5px 5px 50px;
            border-radius: 5px;
            width: ${width || 'auto'};
            height: ${height || 'auto'};
            background-color: ${bgColor || 'transparent'};
            margin: 25px 0px 0px 0px;
          }

          .navpath-text {
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            margin-right: 15px;
            font-size: 13px;
            cursor: pointer;
          }
            
          //      @media (max-width: 1200px) {
          //   .navpath-container {
          //     height: 45px; /* Increase height */
          //     padding-left: 30px;
          //     margin-left: 40px;
          //     font-size: 12px;
          //   }

          //   .navpath-text {
          //     font-size: 14px;
          //     margin-right: 10px;
          //     font-size: 12px;
          //   }

          //   .navpath-arrow {
          //     margin-right: 10px;
          //   }
          // }


          //  @media (max-width: 992px) {
          //   .navpath-container {
          //     height: 45px; /* Increase height */
          //     padding-left: 30px;
          //     margin-left: 50px;
          //     font-size: 12px;
          //   }

          //   .navpath-text {
          //     font-size: 14px;
          //     margin-right: 10px;
          //     font-size: 12px;
          //   }

          //   .navpath-arrow {
          //     margin-right: 10px;
          //   }
          // }

          /* Responsive styles */
          @media (max-width: 768px) {
            .navpath-container {
              height: 65px; /* Increase height */
              padding-left: 30px;
              margin-left: 50px;
            }

            .navpath-text {
              font-size: 14px;
              margin-right: 10px;
            }

            .navpath-arrow {
              margin-right: 10px;
            }
          }

          @media (max-width: 480px) {
            .navpath-container {
              height: 75px; /* Further increase height for very small screens */
              flex-wrap: wrap;
              padding-left: 20px;
            }

            .navpath-text {
              font-size: 14px;
              margin-bottom: 5px;
            }
          }
          }
        `}
      </style>
    </div>
  );
}
