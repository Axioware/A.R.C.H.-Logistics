import React from 'react';
import PageHeading from './PageHeading'; // Adjust path if necessary
import FilterButton from './FilterButton'; // Adjust path if necessary
import SearchBar from './SearchBar'; // Adjust path if necessary

export default function TableTop() {
  // Example function to handle search and filter actions
  const handleSearch = (searchText) => {
    console.log('Searching for:', searchText);
  };

  const handleFilterClick = () => {
    console.log('Filter button clicked');
  };

  return (
    <>
    <style>
    {`
      .row-container1 {
        display: flex;
        width: 100%;
        position: relative
        text-align: right;
      }

      .table-top-container {
            display: flex;
            width: 90%;
            height: 5%;
            text-align: left;
            border: 2px solid black; /* Border color and width */
            border-radius: 5px;
}
    `}
  </style>
    <div className="table-top-container">
      
      <PageHeading
        text="Hello World"
        text_color={[0, 0, 0]} // White text color
        sidebar_color={[30, 61, 89]} // Sidebar color
        width="80%" // Adjust width as needed
        height="10px" // Adjust height as needed
      />
      

      <div className="row-container1">
        <FilterButton
          text="+ Filter By"
          text_color={[255, 255, 255]} // White text color
          background_color={[30, 61, 89]} // Purple background
          function={handleFilterClick} // Function to call on button click
          width="100%" // Set width as percentage
          height="100%" // Set height as percentage
        />

        <SearchBar
          hint="Search..."
          field_color={[255, 255, 255]} // White background
          function={handleSearch} // Function to call on search
          width="100%" // Set width as percentage
          height="4%" // Set height for input field
        />
      </div>
    </div>
    </>
  );
}
