import React, { useState } from "react";

const FilterOptionsTransaction = ({ billing, user, ware, setbill, setuser, setware }) => {
  const [billingType, setBillingType] = useState(billing);
  const [userStatus, setUserStatus] = useState(user);
  const [warehouse, setWarehouse] = useState(ware);
  const [isApplied, setIsApplied] = useState(false); // State to track if "Apply" is clicked

  const handleFilterChange = (type, option) => {
    console.log(`Filter changed: Type - ${type}, Option - ${option}`);

    if (type === 'Billing Type') {
      setbill(option);
    } else if (type === "User Status") {
      setuser(option);
    } else if (type === "Warehouses") {
      setware(option);
    }
  };

  const handleReset = () => {
    setbill("All");
    setuser("All");
    setware("All");
    setBillingType("All");
    setUserStatus("All");
    setWarehouse("All");
    setIsApplied(false); // Reset the apply button state
    console.log("Filters reset to default values.");
  };

  const handleApply = () => {
    setIsApplied(true); // Set the button to "applied" state
    console.log("Filters applied:", { billingType, userStatus, warehouse });
  };

  return (
    <div style={{ zIndex: '60' }}>
      <div className="filter-container">
        <div className="filters-row">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Billing Type</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm transition duration-200"
              value={billingType}
              onChange={(e) => {
                setBillingType(e.target.value);
                handleFilterChange("Billing Type", e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Daily">Daily</option>
              <option value="Bimonthly">Bimonthly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 mr-8 font-medium text-gray-700">User Status</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm transition duration-200 "
              value={userStatus}
              onChange={(e) => {
                setUserStatus(e.target.value);
                handleFilterChange("User Status", e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Warehouses</label>
          <select
            className="w-full p-2 border rounded-md shadow-sm transition duration-200 "
            value={warehouse}
            onChange={(e) => {
              setWarehouse(e.target.value);
              handleFilterChange("Warehouses", e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Warehouse 1">Warehouse 1</option>
            <option value="Warehouse 2">Warehouse 2</option>
          </select>
        </div>

        <div className="button-container">
          <button
            className="reset-btn bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="apply-btn bg-black hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={handleApply}
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

        select {
          width: 100%;
          padding: 8px;
          border-radius: 6px;
          margin-bottom: 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
          color: black;
          background-color: white;
        }

        select:focus {
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);
          color: black;
        }

        /* Styling options */
        select option {
          background-color: white;
          color: black;
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

export default FilterOptionsTransaction;
