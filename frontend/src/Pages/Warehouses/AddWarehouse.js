import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import { important, position } from "polished";

const AddLocation = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); 
    alert('Warehouse added successfully!');
  };

  const [clearance, setclearance] = useState(1);
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
      const storedState = localStorage.getItem("sidebarclosed");
      return storedState === null ? true : JSON.parse(storedState);
    });
  

  const styles = {
    mainContent: {
      padding: "10px 0px 50px 0px",
      backgroundColor:'f7f6f6',
  },

  form: {
      position:'relative',
      alignSelf:'flex-start',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr', // Two columns
      gap: '20px', // Space between fields
      // border: '2px solid red',
      marginLeft:'20px',
      marginRight:'30px',
      gap:'20px',
      marginTop:'35px',
  },

  select: {

    marginLeft:"40px",
    marginTop:"10px",
  },
  
  buttonContainer: {
      // border: '2px solid black',
      alignSelf:'flex-end',
      display: 'flex',
      flexDirection: 'row',
      width:'250px',
      gap: '20px',
      marginTop: '20px',
      lineHeight:'40px',
  },
  headingcontainer:{
    alignSelf: 'flex-start',
    // border: '2px solid purple',
    marginLeft:'20px',
    marginTop:'15px',

  },

  PageHeading:{
    marginLeft:'10px',
    marginTop:'25px',  
  },

  RoleContainer: {
    alignSelf: 'flex-end',
    marginTop:'10px',  
    marginLeft:"10px",
  },

  label: {
    marginTop:'10px',  
    marginLeft:"20px",
    display:'block',
    fontWeight:'700px',
  },

  select: {
    marginTop:'15px',  
    marginLeft:"10px",
    display:'block',
    width:'260px',
    height:'45px',
    borderRadius:'10px',
    border: '1px solid lightgrey',
    boxShadow: '1px 1px 1px 1px lightgrey',
  },
  };
  
  return (
  <div>
      {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      ) : (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      )}
        
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={styles.mainContent}>
          <NavPath
            text={['Home', 'Warehouses', 'Add Warehouses']}
            paths={['/home', '/warehouses', '/add-warehouses']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="100%"
            height="50px"
          />
          
          <div id="tableBackground" style={mainStyles.tableBackground}>

          <div id="headingcontainer" style={styles.headingcontainer}>
            <PageHeading text="Add Warehouses" />
          </div>

            <form id="form" style={styles.form} onSubmit={handleSubmit}>
           

          <GeneralField label="Name" field_type="text" hint="Enter warehouse name" />
          <GeneralField label="Country" field_type="text" hint="Country (e.g., USA)" />
          <GeneralField label="State" field_type="text" hint="State (e.g., Texas)" />
          <GeneralField label="City" field_type="text" hint="City (e.g., Stafford)" />
          <GeneralField label="Address" field_type="text" hint="Full address" />
          <GeneralField label="Zip Code" field_type="text" hint="Zip code" />
          <GeneralField label="Email" field_type="email" hint="Email address (e.g., example@mail.com)" />
          <GeneralField label="Phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" />
              
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                  <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]}  text_color={["0", "0", "0"]}   />
                  <GeneralButton text="Add" type="submit" width="100px" height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;