import React, { useState } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import archlogo from '../../Assets/Images/logo1.png';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';

const AddLocation = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    alert('Warehouse added successfully!');
  };

  const handleCancel = () => {
    console.log('Form cancelled'); // Debug log
    alert('Form cancelled!');
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
      marginRight: "4%",
      height: "80%",
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '20px',
    },
    container: {
      backgroundColor: "#F5F5F5",
      padding: '20px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    buttonContainer: {
        border: '2px solid white',
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
        background_color :"#F5F5F5",
    
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
        isSidebarOpen_p={isSidebarOpen}
      />

      <div style={styles.mainContent}>
        <NavPath
          text={['Setting', 'location', 'Add location']}
          paths={['/home', '/add-warehouses', '/add-warehouses']}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
          width="100%"
          height="50px"
        />

        <div style={styles.container}>
          <PageHeading text="Add Location" />
          <form style={styles.form} onSubmit={handleSubmit}>
            <GeneralField label="Name" field_type="text" />
            <GeneralField label="Type" field_type="text" />
            <GeneralField label="Warehouse" field_type="text" />
          </form>

          {/* Button Container */}
          <div id="buttonContainer" style={styles.buttonContainer}>
                  <GeneralButton text="Cancel" width="5%" height="400%" />
                  <GeneralButton text="Add" type="submit" width="5%" height="400%" />
              </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
