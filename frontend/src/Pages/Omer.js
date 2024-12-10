import React from 'react';
import FilterOptions from '../Components/General/FilterOptions'; // Adjust the import path as necessary

const Omer = () => {
  const optionsText = ['Business', 'Value', 'Health', 'Environment', 'Adventure'];
  const optionsTextColor = [0, 0, 0]; // Black text
  const initialSelected = ['Business'];
  const optionsBackgroundColor = [235, 232, 232]; // Light grey
  const optionsHoverColor = [112, 128, 144]; // Slate grey
  const optionsSelectedColor = [26, 24, 24]; // Almost black
  const selectedButtonTextColor = [255, 255, 255]; // White text for selected buttons
  const borderRadius = "10px";
  const optionsWidth = ['120px', '120px', '120px', '120px', '120px']; // Ensure each option has a width
  const optionsHeight = ['50px', '50px', '50px', '50px', '50px']; // Ensure each option has a height

  const handleOptionClick = (option) => {
    console.log(`Option selected: ${option}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Filter Options Example</h1>
      <FilterOptions
        text={optionsText}
        text_color={optionsTextColor}
        selected={initialSelected}
        background_color={optionsBackgroundColor}
        hover_color={optionsHoverColor}
        selected_color={optionsSelectedColor}
        selected_button_text_color={selectedButtonTextColor}
        func={handleOptionClick}
        radio={true}
        border_radius={borderRadius}
        width={optionsWidth}
        height={optionsHeight}
      />
    </div>
  );
};

export default Omer;
