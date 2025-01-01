import React from 'react';
import PageHeading from './PageHeading'; // Adjust path if necessary
import FilterButton from './FilterButton'; // Adjust path if necessary
import SearchBar from './SearchBar'; // Adjust path if necessary

export default function TableTop({
  search_function,
  filter_function,
  heading_text,
}) {

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
            flex-wrap: wrap; /* Allow items to wrap on smaller screens */
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

          /* Media Queries for Responsiveness */
          @media (max-width: 768px) {
            .table-top-container {
              flex-direction: column; /* Stack elements vertically */
              align-items: flex-start; /* Align to the left for smaller screens */
              gap: 15px; /* Add space between items */
            }

            .row-container1 {
              justify-content: flex-start; /* Align buttons to the left */
              width: 100%; /* Make sure row container takes full width */
              gap: 15px; /* Adjust space between buttons */
              margin-top: 10px;
            }

            .page-heading {
              width: 100%; /* Ensure page heading takes full width */
            }
          }

          @media (max-width: 480px) {
            .row-container1 {
              flex-direction: column; /* Stack the FilterButton and SearchBar vertically */
              gap: 10px; /* Reduce the gap between buttons */
            }

            .page-heading {
              text-align: center; /* Center the page heading on small screens */
            }
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
