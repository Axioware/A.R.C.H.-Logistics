import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import archlogo from '../../Assets/Images/logo1.png';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import { borderRadius } from "polished";

const AddUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    alert('Warehouse added successfully!');
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    mainContent: {
      flex: 1,
      padding: "10px",
      transition: "margin-left 0.5s ease",
      marginLeft: isSidebarOpen ? "18%" : "4%",
      marginRight:"4%",
      // border: '2px solid white',
      height:"80%",
  },

  form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr', // Two columns
      gap: '20px', // Space between fields
      // border: '2px solid white',
      marginLeft:'20px',
      marginTop:'35px',
  },

  select: {
    marginLeft:"40px",
    marginTop:"40px",
  },

  buttonContainer: {
    // border: '2px solid white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      height:'70%', // Ensure container extends full width
      gap: '10px',
      marginTop: '20px',
      lineHeight:'40px',
  },

  container:{
    border: '2px solid white',
    borderRadius:'8px',
    backgroundColor :"#F5F5F5",
    padding: '20px',
    gap: '10px',
    boxShadow: '2px 2px 2px 2px lightgrey',
  },

  PageHeading:{
    marginLeft:'0px',
    marginTop:'20px',  
  },

  RoleContainer: {
    marginTop:'10px',  
    marginLeft:"10px",
    width:'100%',
  },

  label: {
    marginTop:'10px',  
    marginLeft:"20px",
    display:'block',
    fontWeight:'700px',
  },

  select: {
    marginTop:'20px',  
    marginLeft:"10px",
    display:'block',
    width:'260px',
    height:'45px',
    borderRadius:'09px',
    border: '2px solid lightgrey',
    boxShadow: '2px 2px 2px 2px lightgrey',
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
        expanded = {['User_Management']}
      />
        

        <div style={styles.mainContent}>
          <NavPath
            text={['Home', 'All User', 'Add User']}
            paths={['/home', '/add-user', '/edit-user']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="100%"
            height="50px"
          />

          
          <div id="container" style={styles.container}>
            <PageHeading text="Add User" />
            
        <div id="RoleContainer" style={styles.RoleContainer}>

        <label htmlFor="Dropdown" style={styles.label}>Role</label>

        <select name="Dropdown" id="Dropdown" style={styles.select}>
            <option value="Client">Client</option>
            <option value="Prep-Team">Prep-Team</option>
            <option value="VA's">VA's</option>
            <option value="Others">Others</option>
            </select>
        </div>

          <form id="form" style={styles.form} onSubmit={handleSubmit}>
          <GeneralField label="LLC Name" field_type="text" hint="Enter Company name" />
          <GeneralField label="First Name" field_type="text" hint="First Name (e.g. , John)" />
          <GeneralField label="Last Name" field_type="text" hint="Last Name (e.g. , Doe)" />
          <GeneralField label="Phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" />
          <GeneralField label="Address" field_type="text" hint="Full address" />
          <GeneralField label="Country" field_type="text" hint="Country (e.g., USA)" />
          <GeneralField label="State" field_type="text" hint="State (e.g., Texas)" />
          <GeneralField label="City" field_type="text" hint="City (e.g., Stafford)" />
          <GeneralField label="Zip Code" field_type="text" hint="Zip code" />
          <GeneralField label="Email" field_type="email" hint="Email address (e.g., example@mail.com)" />
          <GeneralField label="Alternate Email" field_type="email" hint="Alternate Email address (e.g., example@mail.com)" />
          <GeneralField label="Password" field_type="text" hint="Enter Password" />
          <GeneralField label="Retype Password" field_type="text" hint="Re-Type Password" />

             
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                  <GeneralButton text="Cancel" width="10%" height="100%" button_color={["230", "230", "230"]}  text_color={["0", "0", "0"]}   />
                  <GeneralButton text="Add" type="submit" width="10%" height="100%" />
              </div>
            </div>
            </div>
            </div>
  );
};

export default AddUser;