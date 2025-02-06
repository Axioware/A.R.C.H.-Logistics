import React, { useState } from "react";
import MultiSelectedDropDown from "../Components/General/MultiSelectedDropDown"; // Adjust the import path if needed

export default function App() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelection = (values) => {
    setSelectedValues(values);
    console.log("Selected values:", values);
  };

  const sampleData = ["Apple", "Banana", "Cherry", "Mango", "Orange"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Selected: {selectedValues.join(", ")}</h2>
      <MultiSelectedDropDown 
        data={sampleData} 
        width="250px" 
        height="45px" 
        onSelect={handleSelection} 
      />
    </div>
  );
}
