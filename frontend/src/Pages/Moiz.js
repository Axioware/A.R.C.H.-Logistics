import React from 'react';
import PageHeading from '../Components/Table_Components/PageHeading'; // Adjust the path as needed

function App() {
  return (
    <div>
      <PageHeading 
  text="All Users" 
  text_color={[8, 70, 127]}  // Blue text color
  sidebar_color={[25, 106, 172]} // Green sidebar color
  width="20%" 
  height="50px"
  font_size="1.7rem"
/>

    </div>
  );
}

export default App;
