import React from 'react';

const GeneralButton = ({
  text = "Click Me", // Default button text
  text_color = [255, 255, 255], // Default text color: white
  button_color = [44, 91, 151], // Default button color: blue
  name = "generalButton", // Default name attribute
  id = "generalButton", // Default id attribute
  submit = false, // Default button type (false for a standard button)
  width = "150px", // Default button width
  height = "45px", // Default button height
}) => {
  const buttonStyle = {
    backgroundColor: `rgb(${button_color.join(', ')})`,
    color: `rgb(${text_color.join(', ')})`,
    width,
    height,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button
      style={buttonStyle}
      type={submit ? "submit" : "button"}
      name={name}
      id={id}
    >
      {text}
    </button>
  );
};

export default GeneralButton;
