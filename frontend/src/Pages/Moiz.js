import React from 'react';
import TopNavBar from '../Components/General/TopNavBar';

function App() {
  // Define sample data for the parameters
  const parameters = {
    background_color: [255, 255, 255],
    text_color: [0, 0, 0],
    logo: '/path/to/logo.png',
    company_name: 'A.R.C.H Labs',
    company_name_color: [0, 0, 255], // Blue color for the company name
    username: 'Owner',
    username_color: [255, 0, 0], // Red color for the username
  };

  return (
    <div>
      <TopNavBar
        background_color={parameters.background_color}
        text_color={parameters.text_color}
        logo={parameters.logo}
        company_name={parameters.company_name}
        company_name_color={parameters.company_name_color}
        username={parameters.username}
        username_color={parameters.username_color}
      />
    </div>
  );
}

export default App;
