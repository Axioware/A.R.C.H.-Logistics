import React from 'react';
import FilterDropdown from '../Components/General/FilterDropdown'; // Adjust the path as necessary

const Omer = () => {
  const optionsText = ['Business', 'Value', 'Health', 'Environment', 'Adventure'];
  const optionsTextColor = [56, 21, 90];
  const initialSelected = ['Business'];
  const optionsBackgroundColor = [235, 232, 232];
  const optionsHoverColor = [112, 128, 144];
  const optionsSelectedColor = [26, 24, 24];
  const borderRadius = '10px';
  const optionsWidth = ['200px']; // Assume a unified width for simplicity
  const optionsHeight = ['40px']; // Assume a unified height

  const handleOptionClick = (option) => {
    console.log(`Option selected: ${option}`);
  };

  return (
    <div>
      <h1>Filter Dropdown Example</h1>
      <FilterDropdown
        text={optionsText}
        text_color={optionsTextColor}
        selected={initialSelected}
        background_color={optionsBackgroundColor}
        hover_color={optionsHoverColor}
        selected_color={optionsSelectedColor}
        func={handleOptionClick}
        radio={false}
        border_radius={borderRadius}
        width={optionsWidth}
        height={optionsHeight}
      />
    </div>
  );
};

export default Omer;
