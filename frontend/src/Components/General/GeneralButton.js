import React from 'react';

const GeneralButton = ({
  text, 
  text_color = [255, 255, 255], // Default text color: white
  button_color = [23, 23, 23], // Default button color: dark
  name,
  id, 
  font_size,
  submit = false, // Default button type (false for a standard button)
  width,  
  height, 
  border,
  func = () => {}, // Default function: no-op
}) => {
  // Function to safely handle RGB array and convert it to a CSS string
  const toRGBString = (colorArray) => {
    // Check if it's an array and has exactly three elements
    if (Array.isArray(colorArray) && colorArray.length === 3) {
      return `rgb(${colorArray.join(', ')})`;
    }
    // Fallback if not a valid array
    return 'rgb(255, 255, 255)'; // default to white if there's an issue
  };

  const buttonStyle = {
    backgroundColor: toRGBString(button_color),
    color: toRGBString(text_color),
    width,
    height,
    border: border ? `2px solid ${border}` : 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: font_size || '16px' // Provide a sensible default for fontSize
  };

  return (
    <button
      style={buttonStyle}
      type={submit ? "submit" : "button"}
      name={name}
      id={id}
      onClick={func} // Attach the function to the onClick event
    >
      {text}
    </button>
  );
};

export default GeneralButton;
