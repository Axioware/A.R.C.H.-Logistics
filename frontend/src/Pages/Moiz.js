import React from 'react';
import AddButton from '../Components/Table_Components/AddButton'; // Adjust the import path if necessary

function App() {
  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AddButton
        text="Add User" 
        text_color={[255, 255, 255]} 
        path="/all_users" 
        background_color={[56, 21, 90]} 
        class_name="custom-class" 
        width="20%" 
        height="10%" 
      />
    //  </div>
  );
}

export default App;
