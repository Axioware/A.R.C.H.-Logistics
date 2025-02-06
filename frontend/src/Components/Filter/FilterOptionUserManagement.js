import React, { useState } from "react";
import Select from 'react-select';

const FilterOptionsUserManagement = ({ billing, user, ware, setbill, setuser, setware }) => {
  const [billingType, setBillingType] = useState(billing);
  const [userStatus, setUserStatus] = useState(user);
  const [warehouse, setWarehouse] = useState(ware);

  const billingOptions = [
    { value: 'All', label: 'All' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Bimonthly', label: 'Bimonthly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  const userStatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const warehouseOptions = [
    { value: 'All', label: 'All' },
    { value: 'Warehouse 1', label: 'Warehouse 1' },
    { value: 'Warehouse 2', label: 'Warehouse 2' }
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
        <div className="filters-row">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Billing Type</label>
            <Select
              options={billingOptions}
              value={billingOptions.find(option => option.value === billingType)}
              onChange={(selectedOption) => handleChange('Billing Type', selectedOption)}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  borderColor: '#e2e8f0', // Same border as in the <select> element
                  boxShadow: 'none', // To match no shadow effect
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

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">User Status</label>
            <Select
              options={userStatusOptions}
              value={userStatusOptions.find(option => option.value === userStatus)}
              onChange={(selectedOption) => handleChange('User Status', selectedOption)}
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

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Warehouses</label>
          <Select
            options={warehouseOptions}
            value={warehouseOptions.find(option => option.value === warehouse)}
            onChange={(selectedOption) => handleChange('Warehouses', selectedOption)}
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

        <div className="button-container">
          <button
            className="reset-btn bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={() => {
              setbill('All');
              setuser('All');
              setware('All');
            }}
          >
            Reset
          </button>
          <button
            className="apply-btn bg-black hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={() => console.log("Filters applied")}
          >
            Apply
          </button>
        </div>
      </div>

      <style jsx>{`
        .filter-container {
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: auto;
          background-color: white;
        }

        .filters-row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        label {
          font-weight: bold;
          margin-bottom: 8px;
          display: block;
          color: #4a5568;
        }

        .reset-btn:focus,
        .apply-btn:focus {
          outline: none;
          box-shadow: none;
        }

        .reset-btn:active,
        .apply-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default FilterOptionsUserManagement;
