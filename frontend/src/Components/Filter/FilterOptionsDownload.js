import React, { useState } from "react";
import Select from 'react-select';

const FilterOptionsDownload = ({ billing, user, ware, setbill, setuser, setware }) => {
  const [billingType, setBillingType] = useState(billing);
  const [userStatus, setUserStatus] = useState(user);
  const [warehouse, setWarehouse] = useState(ware);

  const categoryOptions = [
    { value: 'FBA', label: 'FBA' },
    { value: 'FBM', label: 'FBM' },
    { value: 'Storage', label: 'Storage' },
    { value: 'Other', label: 'Other' }
  ];

  const handleChange = (type, selectedOption) => {
    const value = selectedOption ? selectedOption.value : 'All';
    if (type === 'Billing Type') {
      setbill(value);
    } else if (type === 'User Status') {
      setuser(value);
    } else if (type === 'Warehouses') {
      setware(value);
    }
  };

  return (
    <div style={{ zIndex: '60' }}>
      <div className="filter-container">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <Select
            options={categoryOptions}
            onChange={(selectedOption) => handleChange('Category', selectedOption)}
            styles={{
              control: (provided) => ({
                ...provided,
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                marginBottom: '12px',
                borderColor: '#e2e8f0',
                boxShadow: 'none',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected || state.isFocused ? 'black' : 'white',
                color: state.isSelected || state.isFocused ? 'white' : 'black',
                cursor: 'pointer',
              })
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptionsDownload;
