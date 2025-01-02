import React from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import PageHeading from '../../Components/Table_Components/PageHeading';

const BoxContent = () => {
  const styles = {
    mainContent: {
      flex: 1,
      padding: "10px",
      marginLeft: "18%",
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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      gap: '10px',
      marginTop: '20px',
    },
    heading: {
      marginBottom: '20px',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submit logic here
    console.log("Form Submitted");
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.heading}>
          <PageHeading text="Add Location" />
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
          <GeneralField 
            label="Warehouse *" 
            field_type="text" 
            hint="Enter the warehouse name (e.g., Main Warehouse)" 
            required 
          />
        </form>

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
      </div>
    </div>
  );
};

export default BoxContent;
