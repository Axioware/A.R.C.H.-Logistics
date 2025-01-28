import React, { useState } from 'react';
import LargeModal from '../Components/Modals/SuccessModal';  

const OmerComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);  

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    console.log("Changes saved!");
    handleCloseModal();  // Optionally close modal after save
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {modalOpen && (
        <LargeModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          title="User Added"
          content="You are about to perform an action that could impact your account or data. Please review all details carefully before proceeding to ensure accuracy."
        />
      )}
    </div>
  );
};

export default OmerComponent;
