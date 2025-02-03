import React, { useState } from 'react';

const GeneralButton = ({
  text, 
  text_color = [255, 255, 255],
  button_color = [23, 23, 23],
  name,
  id, 
  font_size,
  submit = false,
  width,  
  height, 
  border,
  func = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const toRGBString = (colorArray) => {
    if (Array.isArray(colorArray) && colorArray.length === 3) {
      return `rgb(${colorArray.join(', ')})`;
    }
    return 'rgb(255, 255, 255)';
  };

  const buttonStyle = {
    backgroundColor: isHovered ? toRGBString(text_color) : toRGBString(button_color),
    color: isHovered ? toRGBString(button_color) : toRGBString(text_color),
    width,
    height,
    border: border ? `2px solid ${border}` : 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: font_size || '16px',
    transition: 'all 0.3s ease' // Smooth transition for hover effect
  };

  return (
    <button
      style={buttonStyle}
      type={submit ? "submit" : "button"}
      name={name}
      id={id}
      onClick={func}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
};

export default GeneralButton;