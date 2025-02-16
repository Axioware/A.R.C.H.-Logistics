import React, { useState } from "react";

const Dropdown = ({ options, selected, onChange, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-64">
      {/* Selected Option */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-left flex justify-between items-center shadow-sm hover:bg-gray-100"
      >
        {selected || <span className="text-gray-400">{placeholder}</span>}
        <span className="ml-2">&#9662;</span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
