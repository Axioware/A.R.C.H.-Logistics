import React from "react";
import NavBarSidebar from "../Components/General/NavBarSidebar";

const Omer = () => {
  return (
    <div style={{ fontSize: "16px", fontFamily: "'Roboto', sans-serif" }}>
      <NavBarSidebar
        icons={[
          "https://via.placeholder.com/20", // Icon for Inventory
          "https://via.placeholder.com/20", // Icon for Users
        ]}
        names={[
          ["Inventory", "Active Orders", "Completed Orders"],
          ["Users", "Add User", "View Users"],
        ]}
        expanded={[false, false]} // Initial state for menus
        background_color={[30, 61, 89]} // Sidebar background
        text_color={[255, 255, 255]} // Text color
        logo="https://via.placeholder.com/120" // Placeholder logo
        username="John Doe"
        selected_color={[56, 21, 90]} // Highlight color
        toggle={true} // Sidebar expanded
        width="240px"
        height="100vh"
      />
      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
          fontSize: "1rem", // Use rem to scale font size based on root font size
        }}
      >
        <h1>Welcome to the Dashboard</h1>
        <p>Main content goes here.</p>
      </div>
    </div>
  );
};

export default Omer;
