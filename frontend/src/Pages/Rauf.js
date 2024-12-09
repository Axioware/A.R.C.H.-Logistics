import React from "react";
import NavBarWithSidebar from "../Components/General/TopSideNavBar";
import archlogo from "../Assets/Images/logo1.png";

function App() {
  return (
    <NavBarWithSidebar
      // background_color={[255, 77, 107]}
      text_color={[255, 255, 255]}
      logo={archlogo}
      company_name="A.R.C.H Labs"
      // company_name_color={[255, 255, 255]}
      username="Owner"
      // username_color={[255, 255, 255]}
      icons={[
        "https://via.placeholder.com/20",
        "https://via.placeholder.com/20",
        "https://via.placeholder.com/20",
      ]}
      names={[
        ["User Management", "All User", "Add User"],
        ["Management", "Add Order", "Delete Order"],
        ["Inventory", "Add Item", "Delete Item"],
      ]}
      routes={[['/ahsan', '/app3'], ['/top1', '/top2']]
      }
      // sidebar_background_color={[42, 77, 107]}
      // sidebar_text_color={[255, 255, 255]}
      // selected_color={[56, 21, 90]}
      // hover_color={[70, 100, 150]}
      // expanded={[false, false, false]}
      sidebar_width="250px"
      sidebar_height="100vh"
      // hamburger_color={[255, 255, 255]}
    />
  );
}

export default App;
