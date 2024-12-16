import React from 'react';
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
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
    <div style={styles.container}>
      <PageHeading text="Add Warehouse" />
      <form onSubmit={handleSubmit}>
        <div style={styles.form}>
          {/* Row 1 */}
          <GeneralField label="Name" field_type="text" />
          <GeneralField label="Country" field_type="text" />

          {/* Row 2 */}
          <GeneralField label="State" field_type="text" />
          <GeneralField label="City" field_type="text" />

          {/* Row 3 */}
          <GeneralField label="Address" field_type="text" />
          <GeneralField label="Zip Code" field_type="text" />

          {/* Row 4 */}
          <GeneralField label="Email" field_type="email" />
          <GeneralField label="Phone" field_type="tel" />
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <GeneralButton text="Cancel" />
          <GeneralButton text="Add" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddWarehouse;
