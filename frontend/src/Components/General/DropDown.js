import React from "react";
import Select from "react-select";

export default function DropDown({ data, width, height, onSelect }) {
  const options = data.map((item) => ({ value: item, label: item }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: width || "200px", // Set width dynamically
      height: height || "40px",
      fontSize: "16px",
    }),
    menu: (provided) => ({
      ...provided,
      width: width || "200px", // Ensure dropdown menu matches control width
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      isSearchable={true}
      onChange={(selectedOption) => onSelect(selectedOption.value)}
      placeholder="Select an option..."
    />
  );
}
