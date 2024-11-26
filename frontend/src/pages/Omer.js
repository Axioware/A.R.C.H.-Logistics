import React from 'react';
import GeneralField from '../Components/General/GeneralField';

function omer() {
  const styles = `
    .input-style {
      background-color: #f0f0f0;
      border-color: blue;
      border: 2px solid green;
    }
    .label-style {
      color: red;
      font-size: 16px;
      border: 2px solid green;
    }
  `;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <style>{styles}</style>
      <h1 style={{ textAlign: 'left', marginBottom: '2rem' }}>Form Components</h1>
    
        <h2>Welcome to Prep-Prime</h2>
      <GeneralField
        label="Username"
        label_position="top"
        hint="Enter your username"
        field_type="text"
        name="username"
        width="100%"
        height="40px"
        className_Input="input-style" 
        className_Label="label-style" 
      />

      <GeneralField
        label="Password"
        label_position="top"
        hint="Enter your password"
        field_type="password"
        name="password"
        width="100%"
        height="40px"
        className_Input="input-style" 
        className_Label="label-style" 
      />
    </div>
  );
}

export default omer();
