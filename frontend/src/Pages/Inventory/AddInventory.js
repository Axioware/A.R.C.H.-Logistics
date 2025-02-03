import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";


const AddInventory = () => {
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
  },

  form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr', // Two columns
      gap: '20px', // Space between fields
      // border: '2px solid white',
      marginLeft:'20px',
      marginTop:'35px',
      marginRight:'100px',
  },

  select: {

    marginLeft:"40px",
    marginTop:"10px",
  },

  buttonContainer: {
    // border: '2px solid white',
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
    marginTop:'20px',  
  },

  RoleContainer: {
    alignSelf: 'flex-start',
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
            text={['Home', 'All Inventory', 'Add Inventory']}
            paths={['/home', '/all-item', '/add-inventory']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="100%"
            height="50px"
          />

          
          {/* <div id="container" style={styles.container}> */}
          <div id="tableBackground" style={mainStyles.tableBackground}>


          <div id="headingcontainer" style={styles.headingcontainer}>
            <PageHeading text="Add Inventory" />
          </div>
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
          <GeneralField label="Item ID" field_type="text" hint="Enter item ID" required={true}/>
          <GeneralField label="Item Name" field_type="text" hint="Auto-filled item name" disabled={true}/>
          <GeneralField label="Description" field_type="text" hint="Auto-filled description" disabled={true}/>
          <GeneralField label="Quantity" field_type="number" hint="Enter quantity" required={true}/>
          <GeneralField label="Category" field_type="dropdown" hint="Select category" required={true}/>
          <GeneralField label="Charge By" field_type="dropdown" hint="Select unit" required={true}/>
          <GeneralField label="Date Added" field_type="date" hint="Select date" required={true}/>
          <GeneralField label="Warehouse" field_type="dropdown" hint="Select warehouse" required={true}/>
          <GeneralField label="Location" field_type="text" hint="Enter location" required={true}/>
          <GeneralField label="Dimension" field_type="text" hint="Enter L x W x H" required={true}/>
          <GeneralField label="Weight (lbs)" field_type="number" hint="Enter weight" required={true}/>
          <GeneralField label="Quantity" field_type="number" hint="Enter available qty" required={true}/>
          <GeneralField label="Bundled Item?" field_type="radio" hint="Is this a bundle?" options={["Yes", "No"]}/>
          <GeneralField label="Pack Size" field_type="number" hint="Units per pack" required={true}/>
          <GeneralField label="Bundle Item ID" field_type="dropdown" hint="Select bundle ID"/>
          <GeneralField label="Quantity (Bundled Item)" field_type="number" hint="Enter bundle qty" required={true}/>
             
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

export default AddInventory;