import React from 'react';
import HyperLink from '../Components/General/HyperLink';  // Adjust the path if necessary

function App() {
  return (
    <div>
      <HyperLink
        text="User Management"
        path="/all_users"
        text_color={[56, 90, 87]}
        width="20%"
        height="12%"
      />
    </div>
  );
}

export default App;
