import React, { useState } from 'react';
import FilterDropdown from '../Components/General/FilterDropdown';

const Omer = () => {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSelection = (option) => {
    console.log("Selected option:", option);
    setSelectedOption(option);
  };

  return (
    <div>
      <h2>Filter Dropdown Example</h2>
      <FilterDropdown
        text={["Option 1", "Option 2", "Option 3"]}
        text_color={[255, 255, 255]} // White text
        background_color={[0, 123, 255]} // Blue background
        hover_color={[0, 86, 179]} // Darker blue on hover
        selected_color={[0, 255, 0]} // Green when selected
        func={handleSelection}
        selected={selectedOption}
        radio={true} // Set to true for single selection, false for multi-select
        border_radius="8px"
        width={["150px"]} // Button width
        height="40px" // Button height
      />
      <p>Selected: {selectedOption.join(", ")}</p>
    </div>
  );
};

export default Omer;
