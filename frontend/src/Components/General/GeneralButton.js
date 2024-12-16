import React from 'react';

const GeneralButton = ({
  text, 
  text_color = [255, 255, 255], // Default text color: white
  button_color = [44, 91, 151], // Default button color: blue
  name = "generalButton", // Default name attribute
  id = "generalButton", // Default id attribute
  submit = false, // Default button type (false for a standard button)
  width,  
  height, 
  marginLeft,
  max_length,
  func = () => {}, // Default function: no-op
}) => {
  const buttonStyle = {
    backgroundColor: `rgb(${button_color.join(', ')})`,
    color: `rgb(${text_color.join(', ')})`,
    width,
    height,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: height
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
