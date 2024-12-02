import React from 'react';
import NavPath from '../Components/General/NavPath';  // Adjust the path if necessary

function App() {
  return (
    <div>
    <NavPath
    text={['Home', 'User Management', 'All Users']}
  paths={['/home', '/user_management', '/all_users']}
  text_color={[255, 255, 255]}  // RGB values for text color
  background_color={[56, 21, 90]}  // RGB values for background color
  hyperlink_size={[['2%', '3%'], ['2%', '3%'], ['2%', '4%']]} 
  width="30%"  
  height="20%" 
/>
</div>
  );
}
export default App;
