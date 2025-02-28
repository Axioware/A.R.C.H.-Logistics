import React from "react";
import Select from "react-select";

export default function DropDown({ label, data, width, height, onSelect, required = false, multi = false, value }) {
  const options = data.map((item) => ({ value: item, label: item }));

  const handleChange = (selectedOptions) => {
    if (multi) {
      onSelect(selectedOptions ? selectedOptions.map(option => option.value) : []); // Handle multiple selected options
    } else {
      onSelect(selectedOptions ? selectedOptions.value : ""); // Ensure no error if no selection
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: width || "250px",
      height: 'auto',
      minHeight: '40px',
      fontSize: "16px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      flexWrap: 'wrap',
      padding: '2px 8px',
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: 'lightgray',
      borderRadius: '2px',
      display: 'flex',
      margin: '2px',
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
      borderRadius: '0 2px 2px 0',
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
        isMulti={multi}
        required={required}
        value={
          multi
            ? options.filter(option => value?.includes(option.value)) // Multi-select: Match selected values
            : options.find(option => option.value === value) || null // Single-select: Match selected value
        }
        onChange={handleChange}
        closeMenuOnSelect={!multi} // Keep menu open for multi-select
      />
    </div>
  );
}
