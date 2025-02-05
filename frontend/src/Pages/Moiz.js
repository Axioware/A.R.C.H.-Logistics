import React, { useState } from "react";
import DropDown from "../Components/General/DropDown"; // ✅ Ensure correct import path

export default function Moiz() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelection = (value) => {
    setSelectedValue(value);
    console.log("Selected:", value);
  };

  const sampleData = ["Apple", "Banana", "Cherry", "Mango", "Orange"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Selected: {selectedValue}</h2>
      <DropDown data={sampleData} width="250px" height="45px" onSelect={handleSelection} />
    </div>
  );
}
