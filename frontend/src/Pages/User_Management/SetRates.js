import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import DropDown from '../../Components/General/DropDown';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import { border, important, position } from "polished";

const SetRates = () => {
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
      gridTemplateColumns: '1fr 1fr 1fr 1fr ', // Two columns
      gap: '20px', // Space between fields
      // border: '2px solid red',
      marginLeft:'20px',
      marginRight:'30px',
      gap:'35px',
      marginTop:'35px',
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
    // border: '2px solid black',
    marginLeft:'20px',
    marginTop:'15px',
  },
  PageHeading:{
    // border:'4px solid red',
    // marginLeft:'10px',
    // marginTop:'20px',  
  },
  label: {  
    display: "flex",
    flexDirection: "column",
    // border:'4px solid purple',
    gap: "5px",
    // marginTop:"10px",
    // marginLeft:"20px",
    // display:'block',
    // fontWeight:'700px',
    // width:'12px',
  },
  select: {
    // border:'4px solid pink',
    // marginTop:'6px',  
    // marginLeft:"2px",
    // display:'block',
    // width:'260px',
    // height:'45px',
    // borderRadius:'10px',
    // border: '1px solid lightgrey',
    // boxShadow: '1px 1px 1px 1px lightgrey',

    width: "260px",
    height: "45px",
    borderRadius: "10px",
    border: "1px solid lightgrey",
    boxShadow: "1px 1px 1px 1px lightgrey",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
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
            text={['Home', 'Users', 'Set Rates']}
            paths={['/home', '/users', '/set-rates']}
          />
          
           <div id="tableBackground" style={mainStyles.tableBackground}> 

          <div id="headingcontainer" style={styles.headingcontainer}>
            <PageHeading text="Set Rates" />
          </div>
            
            <form id="form" style={styles.form} onSubmit={handleSubmit}>
           
           <div id="label container" style={styles.labelcontainer}>
            <label htmlFor="Dropdown" style={styles.label}>Service</label>
            <DropDown data={['fd', 'ds']}/>
            </div>
           
            <GeneralField label="Custom Charge" field_type="text" hint="Enter the Charge for Service" required={true} />             
              
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

export default SetRates;