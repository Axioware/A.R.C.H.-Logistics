import React, { useState } from 'react';

const FilterOptions = ({
  text,
  text_color,
  selected,
  background_color,
  hover_color,
  selected_color,
  selected_button_text_color,  // New parameter for the color of text on selected buttons
  func,
  radio,
  border_radius,
  width,
  height
}) => {
  const [selectedOptions, setSelectedOptions] = useState(selected);

  const handleClick = (option) => {
    if (radio) {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
    func(option);
  };

  const buttonStyle = (index) => ({
    backgroundColor: selectedOptions.includes(text[index]) ? `rgb(${selected_color.join(',')})` : `rgb(${background_color.join(',')})`,
    color: selectedOptions.includes(text[index]) ? `rgb(${selected_button_text_color.join(',')})` : `rgb(${text_color.join(',')})`, // Use selected_button_text_color if the button is selected
    borderRadius: border_radius,
    width: width[index],
    height: height[index],
    padding: '10px',
    margin: '5px',
    border: 'none',
    cursor: 'pointer'
  });

  const hoverStyle = {
    backgroundColor: `rgb(${hover_color.join(',')})`
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {text.map((option, index) => (
        <button
          key={index}
          style={buttonStyle(index)}
          onMouseOver={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
          onMouseOut={e => e.target.style.backgroundColor = selectedOptions.includes(option) ? `rgb(${selected_color.join(',')})` : `rgb(${background_color.join(',')})`}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterOptions;
