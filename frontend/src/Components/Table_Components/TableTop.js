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
    <div className="table-top-container">
      {/* <PageHeading
        text="All"
        text_color={[255, 255, 255]} // White text color
        sidebar_color={[30, 61, 89]} // Sidebar color
        width="60%" // Adjust width as needed
        height="100px" // Adjust height as needed
      /> */}

      <div className="row-container1">
        <FilterButton
          text="+ Filter By"
          text_color={[255, 255, 255]} // White text color
          background_color={[30, 61, 89]} // Purple background
          function={handleFilterClick} // Function to call on button click
          width="10%" // Set width as percentage
          height="7%" // Set height as percentage
        />

        <SearchBar
          hint="Search..."
          field_color={[255, 255, 255]} // White background
          function={handleSearch} // Function to call on search
          width="20%" // Set width as percentage
          height="40px" // Set height for input field
        />
      </div>

      <style>
        {`
          .table-top-container {
            // display: flex;
            // flex-direction: column;
            // align-items: center;
          }

          .row-container1 {
            display: flex;
            // align-items: center;
            // justify-content: space-between;
            // width: 100%;
            // padding: 20px 10px;
          }

          .table-top-container {
                display: block;
                width: 100%;
                text-align: right;
                margin:0px 0px 0px -40px;
}
        `}
      </style>
    </div>
  );
}
