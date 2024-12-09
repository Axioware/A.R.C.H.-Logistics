import React, { useState } from 'react';
import Pagination from '../Components/Table_Components/Pagination';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="app-container">
      <Pagination
        current_page={currentPage}
        total_pages={totalPages}
        text_color={[0, 0, 0]} // Black text
        button_text_color={[255, 255, 255]} // White button text
        button_background_color={[30, 61, 89]} // Purple button background
        button_width="150px" // Adjust button width
        button_height="50px" // Adjust button height
        width="70%" // Adjust pagination container width
        height="60px" // Adjust pagination container height
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
