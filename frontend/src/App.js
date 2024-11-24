import React from 'react';
import GeneralField from './components/general/GeneralField';

const App = () => {
  // CSS styles for demonstration
  const styles = `
    .input-style {
      background-color: #f0f0f0;  // Light grey background for input
      border-color: blue;         // Blue border for input
      border: 2px solid green;
    }
    .label-style {
      color: red;                 // Red text color for label
      font-size: 16px;            // Larger font size for label
      border: 2px solid green;
    }
  `;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <style>{styles}</style>
      <h1 style={{ textAlign: 'left', marginBottom: '2rem' }}>Form Components</h1>
      
      <GeneralField
        label="Username"
        label_position="top"
        hint="Enter your username"
        field_type="text"
        name="username"
        width="100%"
        height="40px"
        className_Input="input-style" // Custom class for the input
        className_Label="label-style" // Custom class for the label
      />

      <GeneralField
        label="Password"
        label_position="top"
        hint="Enter your password"
        field_type="password"
        name="password"
        width="100%"
        height="40px"
        className_Input="input-style" // Custom class for the input
        className_Label="label-style" // Custom class for the label
      />
    </div>
  );
};

export default App;
