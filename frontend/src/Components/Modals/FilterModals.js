import React, { useState } from 'react';
import FilterOptions from '../General/FilterOptions'; // Adjust path as necessary
import GeneralButton from '../General/GeneralButton'; // Ensure the path is correct

// CSS styles defined as objects
const styles = {
  modalContainer: {
    background: 'lightgrey',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    position: 'relative'
  },
  row: {
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  container: {
    background: 'white',
    borderRadius: '12px',
  },
  heading: {
   textAlign:'center',
   fontSize:'16px',     
  }
};

const UserFilterModal = ({ func1, func2, func3, apply_function }) => {
  const [userType, setUserType] = useState([]);
  const [billingType, setBillingType] = useState([]);

  const resetFilters = () => {
    setUserType([]);
    setBillingType([]);
    func1(); // Assuming this resets the modified URL
  };

  const applyFilters = () => {
    apply_function();
    // Assuming this function handles closing the modal and applying the filters
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.container}>
        <div style={styles.row}>
            <h1 style={styles.heading}>Roles</h1>
          <FilterOptions
            text={['Manager', 'Virtual Assistant', 'Prep Team', 'Clients']}
            selected={userType}
            func={(option) => func2(option)}
            radio={false}
            text_color={[0, 0, 0]}
            background_color={[255, 255, 255]}
            hover_color={[200, 200, 200]}
            selected_color={[0, 123, 255]}
            selected_button_text_color={[255, 255, 255]}
            border_radius="5px"
            width={['100%']}
            height={['40px']}
          />
        </div>
        <div style={styles.row}>
          <FilterOptions
            text={['Monthly', 'Bi-monthly', 'Daily']}
            selected={billingType}
            func={(option) => func3(option)}
            radio={false}
            text_color={[0, 0, 0]}
            background_color={[255, 255, 255]}
            hover_color={[200, 200, 200]}
            selected_color={[0, 123, 255]}
            selected_button_text_color={[255, 255, 255]}
            border_radius="5px"
            width={['100%']}
            height={['40px']}
          />
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <GeneralButton
          text="Reset"
          func={resetFilters}
          text_color={[0, 0, 0]} // Black text
          button_color={[200, 200, 200]} // Light grey button
          font_size="16px"
          width="100px"
          height="40px"
          border="none"
        />
        <GeneralButton
          text="Apply"
          func={applyFilters}
          text_color={[255, 255, 255]} // White text
          button_color={[0, 0, 0]} // Black button
          font_size="16px"
          width="100px"
          height="40px"
          border="none"
        />
      </div>
    </div>
  );
};

export default UserFilterModal;
