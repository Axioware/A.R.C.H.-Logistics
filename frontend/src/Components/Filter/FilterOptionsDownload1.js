import React, { useState } from "react";
import Select from 'react-select';

const FilterOptionsDownload1 = ({ category, setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(category);

  const categoryOptions = [
    { value: 'FBA', label: 'FBA' },
    { value: 'FBM', label: 'FBM' },
    { value: 'Storage', label: 'Storage' },
    { value: 'Other', label: 'Other' }
  ];

  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : 'FBA';
    setCategory(value);
  };

  return (
    <div style={{ zIndex: '60' }}>
      <div className="filter-container">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <Select
            options={categoryOptions}
            value={categoryOptions.find(option => option.value === selectedCategory)}
            onChange={handleChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: '100%',
                padding: '0px',
                borderRadius: '3px',
                marginBottom: '12px',
                borderColor: '#e2e8f0',
                boxShadow: 'none',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected || state.isFocused ? 'rgb(70, 130, 180)' : 'white',
                color: state.isSelected || state.isFocused ? 'white' : 'black',
                cursor: 'pointer',
              })
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .filter-container {
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 0px 0px 0px 0px;
          background-color: white;
        }

        label {
          font-weight: bold;
          margin-bottom: 8px;
          display: block;
          color: #4a5568;
        }
      `}</style>
    </div>
  );
};

export default FilterOptionsDownload1;
