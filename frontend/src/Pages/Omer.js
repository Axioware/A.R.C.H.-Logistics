import React, { useEffect, useCallback } from 'react';

// General Components
import MainBackground from '../Components/General/MainBackground';
import HyperLink from '../Components/General/HyperLink';
import NavBarSidebar from '../Components/General/NavBarSidebar';
import NavPath from '../Components/General/NavPath';
import GeneralButton from '../Components/General/GeneralButton';
import GeneralBox from '../Components/General/GeneralBox';
import GeneralField from '../Components/General/GeneralField';


// Icons
import EditIcon from '../Components/Icons/EditIcon';

function Omer() {
  // Example: Fix for React Hook warning
  const fetchData = useCallback(() => {
    console.log('Fetching data...');
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome To React Tutorial</h1>

      {/* General Components */}
      <MainBackground />
      <HyperLink 
      text='Link Sucessful'/>
      <NavBarSidebar />
      <NavPath /> 
      <GeneralButton text="Click Me" />
      <GeneralBox />
      <GeneralField label="Enter Text" field_type="text" />


      {/* Icons */}
      <EditIcon />
    </div>
  );
}

export default Omer;
