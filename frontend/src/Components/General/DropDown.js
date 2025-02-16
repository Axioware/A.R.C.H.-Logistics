import React, { useState } from "react";
import Select from "react-select";
import COLORS from "../../Assets/JS/Color";

export default function DropDown({ label, data, width, height, onSelect, required=false, multi=false }) {
  const options = data.map((item) => ({ value: item, label: item }));
  const [menuIsOpen, setMenuIsOpen] = useState(false);


  const handleChange = (selectedOptions) => {
    if (multi) {
      onSelect(selectedOptions.map(option => option.value)); // Handle multiple selected options
      setMenuIsOpen(false); // Close the menu after selection
      document.activeElement.blur();
    } else {
      onSelect(selectedOptions);
      setMenuIsOpen(false);
      document.activeElement.blur();
    }
  };

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: width || "250px",
      height: 'auto', // Allow the height to grow with content
      minHeight: '40px', // Minimum height to match other inputs
      fontSize: "16px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      flexWrap: 'wrap', // Ensure the tags wrap and do not overflow
      padding: '2px 8px', // Adjust padding for visual alignment
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: 'lightgray',
      borderRadius: '2px',
      display: 'flex',
      margin: '2px', // Add margin around each tag for spacing
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      fontWeight: '200px',
      color: 'black',
      padding: '2px 5px',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'black',
      ':hover': {
        backgroundColor: 'red',
        color: 'white',
      },
      alignItems: 'center',
      display: 'flex',
      paddingLeft: '2px',
      paddingRight: '2px',
      borderRadius: '0 2px 2px 0', // Rounded corners on the right side only
    }),
    menu: (provided) => ({
      ...provided,
      width: width || "250px",
    }),
  };
  

  return (
    <div>
      {label && (
  <div style={{ marginBottom: "10px", fontWeight: '200px' }}>
    {label} {required && <span style={{ color: "red" }}>*</span>}
  </div>
)}

      <Select
        options={options}
        styles={customStyles}
        isSearchable={true}
        isMulti={multi} // Enable multi-selection
        required={required}
        onChange={handleChange}
        menuIsOpen={menuIsOpen}
        onMenuOpen={toggleMenu}
        onMenuClose={toggleMenu}
        closeMenuOnSelect={false} // Keep the menu open after selection to continue selecting
      />
    </div>
  );
}
