import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import archlogo from '../../Assets/Images/logo1.png';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';

const EditWarehouse = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); 
    alert('Warehouse Edited successfully!');
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const styles = {

    mainContent: {
      // border: '2px solid pink',
      flex: 1,
      padding: "10px",
      transition: "margin-left 0.5s ease",
      marginLeft: isSidebarOpen ? "18%" : "4%",
      marginRight:"4%",
      border: '2px solid white',
      height:"80%",
  },

  form: {
    marginTop:'15px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr', 
      gap: '20px', 
      // border: '2px solid black',
  },

  buttonContainer: {
    // border: '2px solid red',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      width: '100%',
      height:'70%', 
      gap: '10px',
      marginTop: '20px',
      lineHeight:'40px',
  },

  container:{
    // border: '2px solid green',

  },

  heading:{
    // border: '2px solid blue',
    marginTop:'15px',

  },

  };
  
  return (
      <div>
      <NavBarWithSidebar
        text_color={[255, 255, 255]}
        logo={archlogo}
        company_name="A.R.C.H Labs"
        username="Owner"
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
        routes={[["/ahsan", "/app3"], ["/top1", "/top2"]]}
        sidebar_width="14%"
        sidebar_height="100vh"
        toggleSidebar_func={toggleSidebar}
        isSidebarOpen_p = {isSidebarOpen}
      />
        

        <div style={styles.mainContent}>
          <NavPath
            text={['Home', 'All Warehouses', 'Add Warehouses']}
            paths={['/home', '/warehouses', '/add-warehouses']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="100%"
            height="50px"
          />

          
          <div id="container" style={styles.container} >
            <div style={styles.heading}>
            <PageHeading text="Edit Warehouse"/>
            </div>
          <form id="form" style={styles.form} onSubmit={handleSubmit}>
              <GeneralField label="Name" field_type="text" hint="Enter warehouse name" />
              <GeneralField label="Country" field_type="text" hint="Country (e.g., USA)" />
              <GeneralField label="State" field_type="text" hint="State (e.g., Texas)" />
              <GeneralField label="City" field_type="text" hint="City (e.g., Stafford)" />
              <GeneralField label="Address" field_type="text" hint="Full address(e.g., 123 Main St, Apt 101)" />
              <GeneralField label="Zip Code" field_type="text" hint="Zip code(e.g., 75001)" />
              <GeneralField label="Email" field_type="email" hint="Email address (e.g., example@mail.com)" />
              <GeneralField label="Phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" />             
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                  <GeneralButton text="Reset" width="10%" height="100%" button_color={[230,230,230]} text_color={[0,0,0]} />
                  <GeneralButton text="Save" type="submit" width="10%" height="100%" />
              </div>
            </div>
            </div>
            </div>
  );
};

export default EditWarehouse;
