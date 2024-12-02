import React from 'react';
import HyperLink from '../Components/General/HyperLink';  // Adjust the path if necessary

function App() {
  return (
    <div>
    <HyperLink
  text="Home"
  path="/all_users"
  text_color={[255, 255, 255]}  // RGB for text color
  background_color={[19, 53, 98]}  // RGB for background color
  hover_background_color={[40, 150, 180]}  // RGB for hover background color
  width="25%"  // Width of the link
  height="5%"  // Increased height (change this to any desired value)
 />


    </div>
  );
}

export default App;
