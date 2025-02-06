import React from "react";
import Select from "react-select";

export default function MultiSelectedDropDown({ data, width, height, onSelect }) {
  const options = data.map((item) => ({ value: item, label: item }));

  const customStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      width: width || "200px", // Set width dynamically
      minHeight: height || "40px", // Set minimum height
      height: hasValue ? "auto" : height || "40px", // Expand height when values are selected
      fontSize: "16px",
      flexWrap: "wrap", // Ensure selected values wrap inside the box
    }),
    menu: (provided) => ({
      ...provided,
      width: width || "200px", // Ensure dropdown menu matches control width
    }),
    multiValue: (provided) => ({
      ...provided,
      fontSize: "14px", // Keep selected values readable
      padding: "2px 5px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      isMulti={true} // Enable multiple selection
      isSearchable={true} // Enable search
      onChange={(selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        onSelect(selectedValues); // Pass selected values to parent
      }}
      placeholder="Select options..."
    />
  );
}
