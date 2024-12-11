import React, { useState } from "react";
// import { useCountries } from 'react-countries';
import Select from "react-select";
import countryList from "react-select-country-list"; // Pre-defined country list


const CountrySelect = ({
  label,
  label_position = 'top',
  hint,
  field_type,
  name,
  width,
  height,
  className_Input = '', // Class name for input
  className_Label = '', // Class name for label
  func,
  id,
  maxLength, // New prop for max length
}) => {
    const [selectedCountry, setSelectedCountry] = useState(null); // State for selected country
    const options = countryList().getData(); // Get the list of countries
  
    const handleChange = (selectedOption) => {
      setSelectedCountry(selectedOption); // Update selected country
      console.log("Selected Country:", selectedOption.label); // Log selected country
    };

  const styles = `
    .field-container {
  display: flex;
  flex-direction: ${label_position === "left" ? "row" : "column"};
  align-items: ${label_position === "left" ? "center" : "flex-start"};
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
}

.field-label {
  font-weight: light;
  text-align: ${label_position === "left" ? "right" : "left"};
  white-space: ${label_position === "left" ? "nowrap" : "normal"};
  min-width: ${label_position === "left" ? "20%" : "auto"};
}

.field-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  width: ${width}; /* This fixes the width */
  height: ${height};
  max-width: 100%; /* Prevents the field from exceeding its container */
}

  `;

  return (
    <div className={`field-container ${label_position === 'left' ? 'left' : ''}`}>
      <style>{styles}</style>
      {label && (
        <label htmlFor={name} className={`field-label ${className_Label}`}>
          {label}
        </label>
      )}
    <Select
        options={options}
        value={selectedCountry}
        onChange={handleChange}
        placeholder="Select a country"
        isSearchable // Allow search functionality
      />
    </div>
  );
};

export default CountrySelect;
