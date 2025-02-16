import React from 'react';
import PageHeading from './PageHeading'; // Adjust path if necessary
import FilterButton from './FilterButton'; // Adjust path if necessary
import SearchBar from './SearchBar'; // Adjust path if necessary

export default function TableTop({
  search_function,
  filter_function,
  heading_text,
  content: Content,
}) {

  return (
    <>
      <style>
        {`
          .table-top-container {
            display: flex;
            justify-content: space-between; /* Space between heading and buttons */
            align-items: center; /* Align items vertically */
            width: 100%;
            margin: 0px 0px 0px 22px; /* Add margin to the right */
            flex-wrap: wrap; /* Allow items to wrap on smaller screens */
            flex-direction: row;
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
          width="auto" // Auto width to align properly
          height="auto" // Auto height
          sidebar_width="5px" // Increased sidebar width for visibility
          sidebar_height="35px" // Set sidebar height explicitly
        />

        <div className="row-container1">
          <SearchBar
            hint="Search..."
            function={search_function} // Function to call on search
            width="300px" // Set width explicitly
            height="50px" // Set height for input field
          />
        </div>
      </div>
    </>
  );
}
