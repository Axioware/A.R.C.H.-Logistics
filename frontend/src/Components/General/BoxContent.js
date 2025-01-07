import React from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import GeneralDropdown from "../General/GeneralDropdown";
import PageHeading from '../../Components/Table_Components/PageHeading';

const BoxContent = () => {
  const styles = {
    mainContent: {
      flex: 1,
      padding: "10px",
      marginRight: "4%",
      height: "80%",
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '20px',
    },
    container: {
      backgroundColor: '#f7f6f6',
      padding: '20px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
      
    },
    buttonContainer: {
      border: '2px solid #F5F5F5',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      gap: '10px',
      marginTop: '40%',
      marginLeft: "50px",
    },
    heading: {
      marginBottom: '20px',
      marginLeft: "-1%",
    },
    selectContainer: {
      marginTop: '7px',
      marginLeft: "10px",
      display: 'block',
      width: '260px',
      height: '45px',
      borderRadius: '9px',
      // border: '2px solid lightgrey',
      // boxShadow: '2px 2px 2px 2px lightgrey',
      padding: '10px',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.heading}>
          <PageHeading text="Edit Location" />
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <GeneralField 
            label="Name *" 
            field_type="text" 
            hint="Enter the name of the location (e.g., Warehouse A)" 
            required 
          />
          <GeneralField 
            label="Type *" 
            field_type="select" 
            options={["Inventory Bin", "Other"]} 
            hint="Select the type of location (e.g., Inventory Bin, Other)" 
            required 
          />

          <GeneralDropdown
          label="Warehouse *"
          options={["Main Warehouse", "Warehouse A", "Warehouse B"]}
          hint="Select the warehouse"
          id="warehouse-dropdown"
          func={(value) => console.log("Selected:", value)}
/>


        <div id="buttonContainer" style={styles.buttonContainer}>
          <GeneralButton 
            text="Cancel" 
            width="120px" 
            height="40px" 
            button_color={["230", "230", "230"]} 
            text_color={["0", "0", "0"]} 
          />
          <GeneralButton 
            text="Add" 
            type="submit" 
            width="120px" 
            height="40px" 
          />
        </div>
      </form>
      </div>
    </div>
  );
};

export default BoxContent;
