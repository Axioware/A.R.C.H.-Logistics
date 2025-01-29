import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import { margin } from "polished";

const AddService = () => {
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
      gridTemplateColumns: '1fr 1fr 1fr ', 
      gap: '80px', 
    //   border: '2px solid green',
      marginLeft:'0px',
      marginRight:'450px',
      marginTop:'55px',
  },
  buttonContainer: {
    border: '2px solid Black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Correct property to align items to the end
    alignItems: 'center', // Align items vertically
    padding: '10px', // Add padding if needed
    gap: '10px',
    marginTop: '20px',
    alignSelf: 'flex-end',
    marginRight: '40px',
    width:'840px,'
  },

  tableBackground: {
    backgroundColor: '#f7f6f6',
    padding: '20px 0px 40px 60px',
    borderRadius: '8px',
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0px 0px 0px',
    boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
  },

  headingcontainer:{
    alignSelf: 'flex-start',
    // border: '2px solid white',
    marginLeft:'0px',
    marginTop:'35px',
  },

  PageHeading:{
    marginTop:'40px',  
  },

  RoleContainer: {
    marginTop:'10px',  
    marginLeft:"10px",
  },

  label: {
    // border: '2px solid red',
    marginTop:'0px',  
    marginLeft:"20px",
    display:'block',
    fontWeight:'700px',
  },

  select: {
    width: '260px', // Only one width property
    height: '45px',
    borderRadius: '10px',
    // border: '1px solid darkgrey', // Only one border property
    boxShadow: '1px 1px 1px 1px lightgrey',
    marginTop: '5px',
    marginLeft: '10px',
    display: 'block',
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
            text={['Home', 'Services', 'Add Service']}
            paths={['/home', '/services', '/add-service']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="100%"
            height="50px"
          />

          <div id="tableBackground" style={mainStyles.tableBackground}>
          <div id="headingcontainer" style={styles.headingcontainer}>
            <PageHeading text="Add Service" /></div>

        <form id="form" style={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="Dropdown" style={styles.label}>Category
            <select name="Dropdown" id="Dropdown" style={styles.select}>
            <option value="FBA">FBA</option>
            <option value="FBM">FBM</option>
            <option value="Others">Others</option>
            </select>
        </label>           

        <GeneralField label="Name" field_type="text" hint="Enter name of Service" required={true} />
        <GeneralField label="Service Charge" field_type="text" hint="Enter the Charge for Service" required={true} />             
          </form>

            <div id="buttonContainer" style={styles.buttonContainer}>
                  <GeneralButton text="Cancel" width="auto" height="50px" button_color={["230", "230", "230"]}  text_color={["0", "0", "0"]}   />
                  <GeneralButton text="Add" type="submit" width="auto" height="50px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;