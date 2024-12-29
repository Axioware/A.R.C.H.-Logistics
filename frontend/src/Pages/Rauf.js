import React from "react";
import NavBarWithSidebar from "../Components/General/TopSideNavBar";
import FilterOptions from "../Components/General/FilterOptions";
import archlogo from "../Assets/Images/logo1.png";
import EditIcon from "../Components/Icons/EditIcon";
import CountrySelect from "../Components/General/CountrySelection";
import PageHeading from '../Components/Table_Components/PageHeading';
import TableTop from '../Components/Table_Components/TableTop';
import SessionExpired  from "../Components/Modals/SessionExpired";

function App() {
  return (
    // <NavBarWithSidebar
    //   // background_color={[255, 77, 107]}
    //   text_color={[255, 255, 255]}
    //   logo={archlogo}
    //   company_name="A.R.C.H Labs"
    //   // company_name_color={[255, 255, 255]}
    //   username="Owner"
    //   // username_color={[255, 255, 255]}
    //   icons={[
    //     "https://via.placeholder.com/20",
    //     "https://via.placeholder.com/20",
    //     "https://via.placeholder.com/20",
    //   ]}
    //   names={[
    //     ["User Management", "All User", "Add User"],
    //     ["Management", "Add Order", "Delete Order"],
    //     ["Inventory", "Add Item", "Delete Item"],
    //   ]}
    //   routes={[['/ahsan', '/app3'], ['/top1', '/top2']]
    //   }
    //   // sidebar_background_color={[42, 77, 107]}
    //   // sidebar_text_color={[255, 255, 255]}
    //   // selected_color={[56, 21, 90]}
    //   // hover_color={[70, 100, 150]}
    //   // expanded={[false, false, false]}
    //   sidebar_width="250px"
    //   sidebar_height="100vh"
    //   // hamburger_color={[255, 255, 255]}
    // />

  // <FilterOptions />,
  // <EditIcon />,
  // <CountrySelect width={"100%"} height={"20px"}/>
  // <PageHeading
  //           text="All User"
  //           text_color={[0, 0, 0]} // White text color
  //           sidebar_color={[30, 30, 30]} // Sidebar color
  //           width="60%" // Adjust width as needed
  //           // height="100px" // Adjust height as needed
  //         />

  <SessionExpired
  heading_text="Session Expired"
  body_text="Your session has expired. Please log in again."
  button_text="Login"
  button_function={() => console.log("Logging in...")}
  // heading_background={[220, 53, 69]}  // Red for header
  // background_color={[255, 255, 255]}  // White for body
  // button_color={[0, 123, 255]}  // Blue button
  // button_hover_color={[0, 86, 179]}  // Darker blue hover
  // width="500px"
  // height="350px"
/>
  );

}

export default App;
