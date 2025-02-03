import React, { useState } from "react";
import FilterOption from "../Components/General/FilterOption"; // Adjust the import path if needed

export default function Omer() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filter by Category</h2>

      <FilterOption
        text="Select Category"
        options={["FBA", "FBM", "Others", "Wholesale", "Retail"]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <p>Selected Category: {selectedCategory || "None"}</p>
    </div>
  );
}
