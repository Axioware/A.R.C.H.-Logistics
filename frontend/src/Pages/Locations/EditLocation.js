import React, { useState } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import archlogo from '../../Assets/Images/logo1.png';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import Forbidden from '../../Components/Error_Components/Forbidden';
import SessionExpiredModal from '../../Components/Modals/SessionExpired';
import BoxContentTop from "../../Components/General/BoxContentTop";

const EditLocation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleCancel = () => {
    // Handle cancel button logic
  };

  const styles = {
    mainContent: {
      flex: 1,
      padding: '10px',
      transition: 'margin-left 0.5s ease',
      marginLeft: isSidebarOpen ? '18%' : '4%',
      marginRight: '4%',
      height: '80%',
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
      border: '2px solid #F5F5F5',
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
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '20px',
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
          text={['Setting', 'location', 'Edit location']}
          paths={['/home', '/edit-location', '/edit-location']}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          hyperlink_size={[["10%", "55%"], ["40%", "50%"], ["4%", "4%"]]}
          width="100%"
          height="50px"
        />

        <BoxContentTop />

        </div>
        </div>
        
  );
};

export default EditLocation;
