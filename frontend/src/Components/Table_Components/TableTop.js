import React from 'react';
import PageHeading from './PageHeading'; // Adjust path if necessary
import FilterButton from './FilterButton'; // Adjust path if necessary
import SearchBar from './SearchBar'; // Adjust path if necessary


export default function TableTop({
  search_function,
  filter_function,
  heading_text,
}) {
  // Example function to handle search and filter actions
  // const handleSearch = (searchText) => {
  //   console.log('Searching for:', searchText);
  // };

  // const handleFilterClick = () => {
  //   console.log('Filter button clicked');
  // };

  return (
    <>
      <style>
        {`
          .table-top-container {
            display: flex;
            justify-content: space-between; /* Space between heading and buttons */
            align-items: center; /* Align items vertically */
            width: 95%;
            margin: 20px auto;
          }

          .row-container1 {
            display: flex;
            justify-content: flex-end; /* Align buttons to the right */
            align-items: center;
            gap: 20px; /* Add spacing between FilterButton and SearchBar */
          }

          .page-heading {
            flex-grow: 1; /* Allow the heading to take up space on the left */
          }
        `}
      </style>

      <div className="table-top-container">
        <PageHeading
          text={heading_text}
          headings={'users'}
          text_color={[0, 0, 0]} // Black text color
          sidebar_color={[23, 23, 23]} // Sidebar color
          width="auto" // Auto width to align properly
          height="auto" // Auto height
          className="page-heading"
          sidebar_width="5px" // Narrow sidebar width
          sidebar_height="40px"
        />

        <div className="row-container1">
          <FilterButton
            text="+ Filter By"
            text_color={[255, 255, 255]} // White text color
            background_color={[23, 23, 23]} // Dark background
            function={filter_function} // Function to call on button click
            width="150px" // Set width explicitly
            height="50px" // Set height explicitly
          />

          <SearchBar
            hint="Search..."
            field_color={[255, 255, 255]} // White background
            function={search_function} // Function to call on search
            width="300px" // Set width explicitly
            height="50px" // Set height for input field
          />
        </div>
      </div>
    </>
  );
}
