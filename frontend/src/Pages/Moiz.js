import React from 'react';
import NavPath from '../Components/General/NavPath';  // Adjust the path if necessary

function App() {
  return (
    <div>
    <NavPath
    text={['Home', 'Utest', 'Users']}
  paths={['/home', '/user_management', '/all_users']}
  text_color={[255, 255, 255]}  // RGB values for text color
  background_color={[200, 21, 90]}  // RGB values for background color
  hyperlink_size={[['10%', '55%'], ['4%', '5%'], ['4%', '4%']]} 
  width="80%"  
  height="100px" 
/>
</div>
  );
}
export default App;
