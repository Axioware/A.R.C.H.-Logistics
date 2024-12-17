import React from 'react';

const GeneralButton = ({
  text, 
  text_color = [255, 255, 255], // Default text color: white
  button_color = [23, 23, 23], // Default button color: blue
  name,
  id, 
  font_size,
  submit = false, // Default button type (false for a standard button)
  width,  
  height, 
  border,
  func = () => {}, // Default function: no-op
}) => {
  const buttonStyle = {
    backgroundColor: `rgb(${button_color.join(', ')})`,
    color: `rgb(${text_color.join(', ')})`,
    width,
    height,
    border: 'none',
    borderRadius: border || '5px',
    cursor: 'pointer',
    fontSize: font_size || 'auto'
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
