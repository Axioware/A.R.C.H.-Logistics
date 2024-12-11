import React from 'react';
import NotFoundPage from '../Components/Error_Components/NotFound'; // Adjust the path as necessary

function Omer() {
  return (
    <div>
      <h1>Welcome to Omer's Page</h1>
      {/* Other content might go here */}
      {/* Now using NotFoundPage for demonstration; typically, you'd use routing to show NotFoundPage conditionally */}
      <NotFoundPage />
    </div>
  );
}

export default Omer;
