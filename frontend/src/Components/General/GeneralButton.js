import React from 'react';

const GeneralButton = ({ text, text_color, button_color }) => {
  const buttonStyle = {
    backgroundColor: `rgb(${button_color.join(', ')})`,
    color: `rgb(${text_color.join(', ')})`,
    width: '150px',
    height: '45px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button style={buttonStyle} type="button">
      {text}
    </button>
  );
};

export default GeneralButton;  // Keep the export as GeneralButton
