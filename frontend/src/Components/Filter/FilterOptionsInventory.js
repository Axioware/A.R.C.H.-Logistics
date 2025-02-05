import React, { useState } from "react";

const FilterOptionsInventory = ({ quantity, location, category, setQuantity, setLocation, setCategory }) => {
  const [quantityRange, setQuantityRange] = useState(quantity);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const handleFilterChange = (type, option) => {
    console.log(`Filter changed: Type - ${type}, Option - ${option}`);

    if (type === 'Quantity Range') {
      setQuantity(option);
    } else if (type === "Location") {
      setLocation(option);
    } else if (type === "Category") {
      setCategory(option);
    }
  };

  const handleReset = () => {
    setQuantity("All");
    setLocation("All");
    setCategory("All");
    setQuantityRange("All");
    setSelectedLocation("All");
    setSelectedCategory("All");
    console.log("Filters reset to default values.");
  };

  const handleApply = () => {
    console.log("Filters applied:", { quantityRange, selectedLocation, selectedCategory });
  };

  return (
    <div style={{ zIndex: '60' }}>
      <div className="filter-container">
        <div className="filters-row">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Quantity Range</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm transition duration-200"
              value={quantityRange}
              onChange={(e) => {
                setQuantityRange(e.target.value);
                handleFilterChange("Quantity Range", e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="<10">&lt;10</option>
              <option value="<50">&lt;50</option>
              <option value="<100">&lt;100</option>
              <option value="<500">&lt;500</option>
              <option value=">500">&gt;500</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 mr-12 font-medium text-gray-700">Location</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm transition duration-200"
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                handleFilterChange("Location", e.target.value);
              }}
            >
              <option value="All">All</option>
              {/* Options should be dynamically filled from backend */}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded-md shadow-sm transition duration-200"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleFilterChange("Category", e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="FBA">FBA</option>
            <option value="FBM">FBM</option>
            <option value="Storage">Storage</option>
            <option value="Other">Other</option>
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

export default FilterOptionsInventory;