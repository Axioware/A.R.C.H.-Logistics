import React from 'react';
import MainBackground from '../Components/General/MainBackground'; // Adjust the path if needed

export default function App() {
  return (
    <div className="app-container">
      <MainBackground
        background_color={[0, 0, 255]}
        border_color={[0, 0, 0]}          
        height="300px"                   
        width="100%"                      
      >
      </MainBackground>
      <style>
        
      </style>
    </div>
  );
}
