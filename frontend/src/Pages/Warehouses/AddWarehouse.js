import React from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import archlogo from '../../Assets/Images/logo1.png';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';

const AddWarehouse = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Warehouse added successfully!');
  };

  const styles = {
    container: {
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      width: '80%',
      margin: 'auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two columns per row
      gap: '20px',
      marginTop: '20px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
      gap: '10px',
    },
  };

  return (
    <div style={{ display: "flex" }}>
      <NavBarWithSidebar
        background_color={[23, 23, 23]}
        text_color={[230, 230, 230]}
        logo={archlogo}
        company_name="A.R.C.H Labs"
        company_name_color={[255, 255, 255]}
        username="Owner"
        username_color={[255, 255, 255]}
        icons={[
          "https://via.placeholder.com/20",
          "https://via.placeholder.com/20",
          "https://via.placeholder.com/20",
        ]}
        routes={[['/app2', '/app3'], ['/top1', '/top2']]}
        sidebar_background_color={[23, 23, 23]}
        sidebar_text_color={[230, 230, 230]}
        selected_color={[230, 230, 230]}
        hover_color={[230, 230, 230]}
        expanded={[false, false, false]}
        sidebar_width="250px"
        sidebar_height="100vh"
        hamburger_color={[255, 255, 255]}
      />

      <div style={{ flex: 1, padding: "20px", marginLeft: "250px" }}>
        <NavPath
          text={['Home', 'User Management', 'All Users']}
          paths={['/home', '/user_management', '/all_users']}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
          width="110%"
          height="50px"
        />

        <div style={styles.container}>
          <PageHeading text="Add Warehouse" />
          <form onSubmit={handleSubmit}>
            <div style={styles.form}>
              <GeneralField label="Name" field_type="text" />
              <GeneralField label="Country" field_type="text" />
              <GeneralField label="State" field_type="text" />
              <GeneralField label="City" field_type="text" />
              <GeneralField label="Address" field_type="text" />
              <GeneralField label="Zip Code" field_type="text" />
              <GeneralField label="Email" field_type="email" />
              <GeneralField label="Phone" field_type="tel" />
            </div>
            <div style={styles.buttonContainer}>
              <GeneralButton text="Cancel" />
              <GeneralButton text="Add" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWarehouse;
