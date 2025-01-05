import React, { useState } from 'react';
import UserFilterModal from '../Components/Modals/FilterModals'; // Assuming the path to UserFilterModal is correct
import GeneralButton from '../Components/General/GeneralButton'; // Adjusted path

function Omer() {
  const [isModalOpen, setModalOpen] = useState(false);

  const modifyUrl = () => {
    console.log("URL Modified");
  };

  const handleUserTypeSelection = (option) => {
    console.log("User Type Selected:", option);
  };

  const handleBillingTypeSelection = (option) => {
    console.log("Billing Type Selected:", option);
  };

  const applyChanges = () => {
    console.log("Filters Applied");
    setModalOpen(false);
  };

  const handleClick = (message) => {
    console.log("Button clicked:", message);
  };

  return (
    <div>
      <h1>User and Billing Management</h1>
      <button onClick={() => setModalOpen(true)}>Open Filter Modal</button>
      {isModalOpen && (
        <>
          <UserFilterModal
            func1={modifyUrl}
            func2={handleUserTypeSelection}
            func3={handleBillingTypeSelection}
            apply_function={applyChanges}
          />
        </>
      )}
    </div>
  );
}

export default Omer;
