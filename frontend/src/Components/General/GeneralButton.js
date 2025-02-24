import React, { useState, useEffect } from 'react';
import COLORS from "../../Assets/JS/Color"; // Import the global color file

const GeneralButton = ({
  text, 
  text_color = COLORS.WHITE,
  button_color = COLORS.PRIMARY_BLUE,
  name,
  id, 
  font_size,
  submit = true,
  width,  
  height, 
  border,
  disabled = false,
  func = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [disableds, setIsDisableds] = useState({disabled});

  const toRGBString = (colorArray) => {
    if (Array.isArray(colorArray) && colorArray.length === 3) {
      return `rgb(${colorArray.join(', ')})`;
    }
    return 'rgb(255, 255, 255)';
  };

  const buttonStyle = {
    backgroundColor: disabled ? "#808080" : isHovered ? toRGBString(text_color) : toRGBString(button_color),
    color: disabled ? "#000000" : isHovered ? toRGBString(button_color) : toRGBString(text_color),
    width,
    height,
    border: border ? `2px solid ${border}` : 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: font_size || '16px',
    transition: 'all 0.3s ease' // Smooth transition for hover effect
  };

  // Add media queries dynamically
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @media (max-width: 768px) {
        #${id} {
          font-size: 14px;
          padding: 8px 16px;
        }
      }
      @media (max-width: 480px) {
        #${id} {
          font-size: 12px;
          padding: 6px 12px;
        }
      }
    `;
    document.head.appendChild(styleTag);

    // Cleanup the style tag when the component unmounts
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [id]); // Re-run effect if `id` changes

  return (
    <button
      style={buttonStyle}
      type={submit ? "submit" : "button"}
      name={name}
      id={id}
      onClick={func}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default GeneralButton;