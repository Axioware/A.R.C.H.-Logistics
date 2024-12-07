import React from "react";
import NavBarSidebar from "../Components/General/NavBarSidebar";
import archlogo from "../Assets/Images/archlabs.jpg";

const Omer = () => {
  const icons = [
    "https://via.placeholder.com/20",  // Example Icon 1
    "https://via.placeholder.com/20",  // Example Icon 2
    "https://via.placeholder.com/20",  // Example Icon 3
  ];

  const names = [
    ["User Management", "All User", "Add User"],
    ["Management", "Add Order", "Delete Order"],
    ["Inventory", "Add Item", "Delete Item"],
  ];

  const background_color = [42, 77, 107]; 
  const text_color = [255, 255, 255];
  const selected_color = [56, 21, 90];
  const logo = archlogo;
  const username = "Omer Butt";

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <NavBarSidebar
        icons={icons}
        names={names}
        expanded={[false, false, false]} 
        background_color={background_color} 
        text_color={text_color}
        logo={logo}
        username={username}
        selected_color={selected_color}
        toggle={true}  
        width="12%" 
        height="100%" 
      />

      {/* Main Content */}
      <div style={{ marginLeft: "12%", padding: "10px", width: "80%" }}>
        <h1>Welcome to Omer's Dashboard</h1>
        {/* Here, we can add more content or components for the main page */}
      </div>
    </div>
  );
};

export default Omer;
